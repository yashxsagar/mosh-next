import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
const schema = z
  .object({
    name: z.string().includes(" ").min(5),
    dob: z
      .date()
      .min(new Date("1950-01-01"), { message: "Too old" })
      .max(new Date("2003-01-01"), { message: "Too young!" }),
    email: z.string().email(),
    password: z.string().min(8),
  })
  .strict()
  .required();

type user = {
  name: string;
  email: string;
  dob: Date;
  password: string;
};

export async function POST(request: NextRequest, response: NextResponse) {
  let body = {} as user;
  //Validating whether the User reg request body contains a payload in the body or not
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
  // body = (await request.json()) as user;
  //Now let's pre-process the date first -->
  body.dob = new Date(body.dob);
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, {
      statusText: "Invalid Request",
      status: 400,
    });
    //If the user requedst body for registering a new user is valid then we proceed to verify whether the user already has registered on our portal or not and exists already or not
  }
  const user = await prisma.user.findUnique({ where: { email: body.email } });
  //If user already exists, return 400
  if (user) {
    return NextResponse.json(
      {
        error: `User with the given email: ${body.email} already exists. Please try signing in instead!`,
      },
      { status: 400 }
    );
  }
  //Else encrypt the password and store the newly generated user in the db engine using the prisma ORM
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newUser = await prisma.user.create({
    data: { name: body.name, dob: body.dob, email: body.email, hashedPassword },
  });
  return NextResponse.json({ email: newUser.email });
}
