import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

interface Props {
  params: { id: number };
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
  //Steps:-
  //Validate the Request Body
  //If invalid, return 400
  //If Valid, fetch the user with the given id
  //If found, replace the object with the usre provided object copy and return 202 with the updated user
  //Else, return 404
  let body = {} as typeof schema;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Please supply a User Object that you want to edit/update" },
      { status: 400 }
    );
  }

  if (id >= 1 && id <= 10) {
    //Validate the user's HTTP request body -->
    //the equivalent of the Joi's schema.validate function is the schema.parse or schema.safeParse fn in zod
    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        // { error: "Invalid Object Shape and/or Contents" },
        { error: result.error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        message: "User Object successfully updated ",
        updatedObject: body,
      },
      { status: 202 }
    );
  }
  return NextResponse.json(
    {
      error: `The requested user with the id: ${id} does not exist`,
    },
    { status: 404 }
  );
}
