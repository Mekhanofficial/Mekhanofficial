import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type EmailPayload = {
  name: string;
  email: string;
  message: string;
};

export const runtime = "nodejs";

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = (await req.json()) as EmailPayload;

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          message: "Missing required fields",
          details: {
            name: !name,
            email: !email,
            message: !message,
          },
        },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!user || !pass) {
      return NextResponse.json(
        {
          message:
            "Server email credentials are missing. Set EMAIL_USER and EMAIL_PASS.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to: user,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <h3>Message</h3>
          <p style="white-space: pre-line;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown server error";
    console.error("Email sending error:", errorMessage);
    return NextResponse.json(
      { message: "Error sending email", error: errorMessage },
      { status: 500 }
    );
  }
}
