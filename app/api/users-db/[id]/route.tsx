import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "../schema";

interface Props {
  //   params: { id: number };
  // params properties have always gotta be of type string --> This is the with which the Next.js compiler calls the route handler with at run time
  params: { id: string };
}
export async function GET(request: NextRequest, { params: { id } }: Props) {
  const user = await prisma.user.findUnique({
    where: { id: id },
  });
  if (!user) {
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });
  }
  return NextResponse.json(user, { status: 200 });
}

//Now let's build a route handler for updating an existing user in the MySql db -->

export async function PUT(request: NextRequest, { params: { id } }: Props) {
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
        Error:
          "Please supply a valid User object and make sure it has valid shape and contents",
      },
      { status: 400 }
    );
  }
  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({
      Errors: result.error.issues.map((i) => `${i.code}:${i.message}`),
    });
  }
  //   await prisma.user.update({ select?: { id: parseInt(id) } });
  //Check if the user exists in our db-->
  let user = await prisma.user.findUnique({ where: { id: id } });
  if (!user) {
    return NextResponse.json(
      { error: `The User with the ${id} doesn't exist in our platform` },
      { status: 404 }
    );
  }
  const updatedUser = await prisma.user.update({
    where: { id: id },
    data: {
      name: body.name,
      email: body.email,
      // followers: body?.followers,
      // isActive: body?.isActive,
    },
  });

  return NextResponse.json(
    { message: "User Updated Successfully!", UpdatedUser: updatedUser },
    { status: 202 }
  );
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  //   try{
  //     const body = await request.json();
  //   }
  //   if (body !== null) {
  //     console.log(request.body);
  //     return NextResponse.json(
  //       { error: "Please keep the HTTP request body empty" },
  //       { status: 400 }
  //     );
  //   }
  //First we check whether the user id supplied in the {params}/Route Parameter wven exists or not?
  const user = await prisma.user.findUnique({ where: { id: id } });
  if (!user) {
    return NextResponse.json(
      {
        Error: `The Requested User with the id:${id} does not exist`,
      },
      { status: 404 }
    );
  }
  const deletedUser = await prisma.user.delete({ where: { id: id } });

  return NextResponse.json(
    {
      message: `The requested User has been deleted`,
      DeletedUser: deletedUser,
    },
    { status: 203 }
  );
}
