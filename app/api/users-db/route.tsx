import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "./schema";
export async function GET(request: NextRequest) {
  //Now let's use the built-in functions within the exported prisma client to query our database
  // Here we will use the findMany() method to return all users from our MySql database engine/offline storage
  const users = await prisma.user.findMany(); //This returns a promise so we await it to get our users
  return NextResponse.json(users);
}

//Now let's create an end-point for creating an object in our MySql database -->

export async function POST(request: NextRequest) {
  let body = {} as {
    email: string;
    name: string;
    followers?: number;
    isActive?: boolean;
  };
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Please supply a valid User Object and make sure it is has valid shape and contents",
      },
      { status: 400 }
    );
  }
  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({
      Errors: result.error.issues.map((i) => {
        return `${i.code}: ${i.message}`;
      }),
    });
  }

  //Note that if there is already a user with the supplied email id in the NextRequest body object, then prisma client will throw an error as we have defined the User model to hold @unique email addresses only
  //So, before calling the create() method on prisma.user, let's check if an identical email address exists in the MySql db engine or not

  const user = await prisma.user.findUnique({ where: { email: body.email } });
  if (!user) {
    const newUser = await prisma.user.create({
      //This fn upon execution asynchronously returns the user object that was created in the MySql db
      data: {
        email: body.email,
        name: body.name.trim(),
        // followers: body?.followers,
        // isActive: body?.isActive,
        // The above 2 are no longer present in the MySql db engine and hence are not reflected in the Prisma client ORM object as well upon a successful migration after the db-adapter form OAuth 2.0 configured Provider Client - Google
      },
    });
    return NextResponse.json(
      {
        message: "New User created Successfully",
        //   user: await prisma.user.findUnique({ where: { email: body.email } }),
        user: newUser,
      },
      { status: 201 }
    );
  }
  return NextResponse.json(
    {
      error: `The User with the supplied email: ${body.email} already exists! Try Logging in instead!`,
    },
    { status: 400 }
  );
}
