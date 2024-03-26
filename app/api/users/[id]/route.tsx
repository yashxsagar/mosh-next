import { NextRequest, NextResponse } from "next/server";
//Now let's see how we can access a single or a bunch of objects from a specifiec collection that is stored at the backend

interface Props {
  params: { id: number };
}
export function GET(request: NextRequest, { params: { id } }: Props) {
  //In a real world application, we're going to fetch data from a database
  //If not found, return a 404 error
  //Else, return not found
  if (id > 10) {
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });
  }
  return NextResponse.json({ id: 1, name: "Tamanna" });
}

//Now let's define a route handler for catering to PUT requests that update an object at this same route
//You can use either the PUT or the PATCH fn. Technically, you can use PUT to replace an object and PATCH for updating 1 or more props
export async function PUT(request: NextRequest, { params: { id } }: Props) {
  //Steps:-
  //Validate the Request Body
  //If invalid, return 400
  //If Valid, fetch the user with the given id
  //If found, replace the object with the usre provided object copy and return 202 with the updated user
  //Else, return 404
  const body = await request.json();
  if (id >= 1 && id <= 10) {
    if (Object.keys(body).length == 2) {
      if (
        body.id &&
        body.id in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] &&
        body.name &&
        body.name.length > 2
      ) {
        return NextResponse.json(
          { response: "Valid Object Request", udaptedObject: body },
          { status: 202 }
        );
      }
      return NextResponse.json(
        { error: `Invalid Object Shape and/or Contents` },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: `Invalid Object Shape and/or Contents` },
      { status: 400 }
    );
  }
  return NextResponse.json(
    {
      error: `The requested user with the id: ${id} does not exist`,
    },
    { status: 404 }
  );
}

export function DELETE(request: NextRequest, { params: { id } }: Props) {
  //Algo
  //Check if the supplied id in the route parameter exists or not
  //If not, return 404 --> Resource not found
  //Else, delete and return the deleted object
  if (id > 10) {
    return NextResponse.json(
      { error: `The requested user with the id: ${id} does not exist` },
      { status: 404, statusText: "Object Not Found" }
    );
  }
  return NextResponse.json(
    {
      Confirmation: `The requested user with the id: ${id} has been successfully deleted`,
      User: { id: id, name: "Mosh" },
    },
    { status: 201, statusText: "Object deleted successfully" }
  );
}
