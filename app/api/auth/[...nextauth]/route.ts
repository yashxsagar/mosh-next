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
import { authOptions } from "../authOptions";
//Now we need to create a route handler function similar to the
//export function GET/POST/PUT/DELETE (request:NextRequest, {params}:Props)

const handler = NextAuth(authOptions);

// Now we export the above route handler function as both GET and POST. So, any GET or POST request received at the /api/auth/[...id] end-point will be handled by the above route handler function

//Basically, we're letting NextAuth expose a bunch of end-points that start /api/auth
export { handler as GET, handler as POST };
