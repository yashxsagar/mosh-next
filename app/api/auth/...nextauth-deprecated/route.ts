// import nextAuth from "next-auth";
import NextAuth, { NextAuthOptions } from "next-auth";
import Email from "next-auth/providers/email";
// import Google from "next-auth/providers/google";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/client";
// import bcrypt from bcrypt:string;
import bcrypt from "bcrypt";
//Now we need to create a route handler function similar to the
//export function GET/POST/PUT/DELETE (request:NextRequest, {params}:Props)

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), //Passing our prisma adapter with our prisma client to the next-auth condfiguration object - authPptions
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "E-Mail",
          placeholder: "Enter your email",
          type: "Email",
        },
        password: {
          label: "Password",
          placeholder: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        //Here we check if the user is valid, we return a valid user object or else we return null

        if (!credentials?.email || !credentials.password) {
          return null;
        }
        //if both the credentials.email and the credentials. password are found and are valid, we perform a dbengine query using our prisma adapter/ORM
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          return null;
        }
        //Now we need to verify whether the supplied password matches or not.
        //For this we use a library called BCrypt
        //It encrypts passwords upon inserting them in the database
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        ); //Our user model yet does not contain the password field/column, so we need to update our prisma schema and perform a migration//We want to keep it optional because if the user logs in with google, this field will not be set
        //This bcrypt.compare() method is an async method that returns a promise which ultimately resolves to a boolean value --> let's name the result (promise resolution)--> passwordsMatch
        //Then based on the boolean result we conditionally return our user object
        return passwordsMatch ? user : null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID!, //With proces.env we can read ur environment variables as properties of env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, //We can add an exlamation mark at the very end to tell the TS compiler that we definitely have a value stored in these variables in the .env file which can accept values of type string or undefined if these area left empty
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
//Specifying custom re-direct URLs
// redirect: {
//   signIn: "http://localhost/api/auth/signout",
// },
//We call the NextAuth({}) and get a handler function
const handler = NextAuth(authOptions);

// Now we export the above route handler function as both GET and POST. So, any GET or POST request received at the /api/auth/[...id] end-point will be handled by the above route handler function

//Basically, we're letting NextAuth expose a bunch of end-points that start /api/auth
export { handler as GET, handler as POST };
