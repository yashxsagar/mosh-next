import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  //   const token = await request.cookies.toString();
  // Second way using a pred-defined function in Next.js framework/library
  const token = await getToken({ req: request }); //The result shown on the client is now actually the decoded JWT of base64 which is retrieved as a cookie in the Chrome Dev Tools --> Inspect option
  //   return NextResponse.json({ token: Object.keys(token).map((t)=>  token[t])} );
  return NextResponse.json(token, {
    status: 200,
    statusText: "OAuth Google Provider Token received successfully",
  });
}
