import { NextRequest, NextResponse } from "next/server";
import schema from "../zod/[id]/schema";
export async function POST(request: NextRequest) {
  let body = {} as { name: string };
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({
      error:
        "Please supply a valid User Object and nake sure it is has valid shape and contents",
    });
  }
  //Now let's just return the body in the response itself --> Whatever we send in the body we get back as an API response
  //   return NextResponse.json(request.ip);
  //   await request.body;
  //   return Response.json({ url: request.url });
  //Validate
  //If Invalid, return 400
  //Else, return 201 with the newly created object ID
  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({
      Errors: result.error.issues.map((i) => {
        return `${i.code}: ${i.message}`;
      }),
    });
  }
  return NextResponse.json(
    { id: 2, name: body.name },
    { status: 201, statusText: "Object Created Successfully" }
  );
}
