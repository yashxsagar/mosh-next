import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import WelcomeTemplate from "@/emails/WelcomeTemplate";
// import { env } from "process";

interface Message {
  subject: string;
  name: string;
}
const schema = z
  .object({
    subject: z.string().min(5).includes(" "),
    name: z.string().min(5).includes(" "),
  })
  .strict()
  .required();
export async function POST(request: NextRequest) {
  let body = {} as Message;
  let token = {} as {} | null;
  try {
    body = await request.json();
    token = await getToken({ req: request });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Please send a valid Email request object with proper shape and contents",
      },
      { status: 400 }
    );
  }
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, {
      status: 400,
      statusText: "Invalid Request",
    });
  }

  //Now let's initialize an instance of the imported Resend class
  const resend = new Resend(process.env.RESEND_API_KEY);
  const status = await resend.emails.send({
    from: "onboarding@resend.com",
    to: "yashxsagar@gmail.com",
    subject: body.subject,
    react: <WelcomeTemplate name={body.name} />,
  });
  return NextResponse.json(status);
}
