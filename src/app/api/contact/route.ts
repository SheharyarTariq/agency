import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  hearAbout?: string;
  message?: string;
}

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  let data: ContactPayload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = data.name?.trim();
  const email = data.email?.trim();
  const message = data.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 }
    );
  }

  const {
    EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD,
    EMAIL_FROM,
    CONTACT_TO,
  } = process.env;

  if (
    !EMAIL_SERVER_HOST ||
    !EMAIL_SERVER_PORT ||
    !EMAIL_SERVER_USER ||
    !EMAIL_SERVER_PASSWORD ||
    !EMAIL_FROM
  ) {
    console.error("Email environment variables are not configured.");
    return NextResponse.json(
      { error: "Email is not configured on the server." },
      { status: 500 }
    );
  }

  const port = Number(EMAIL_SERVER_PORT);
  const transporter = nodemailer.createTransport({
    host: EMAIL_SERVER_HOST,
    port,
    secure: port === 465, // 465 = implicit TLS; 587 = STARTTLS
    auth: {
      user: EMAIL_SERVER_USER,
      pass: EMAIL_SERVER_PASSWORD,
    },
  });

  const rows: [string, string | undefined][] = [
    ["Name", name],
    ["Email", email],
    ["Company / Project", data.company?.trim()],
    ["Project type", data.projectType?.trim()],
    ["Budget", data.budget?.trim()],
    ["Timeline", data.timeline?.trim()],
    ["Heard about us", data.hearAbout?.trim()],
  ];

  const detailsHtml = rows
    .filter(([, v]) => v)
    .map(
      ([label, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;font-size:13px;">${label}</td><td style="padding:4px 0;font-size:13px;"><strong>${esc(
          v as string
        )}</strong></td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;">
      <h2 style="margin:0 0 16px;font-size:18px;">New project brief</h2>
      <table style="border-collapse:collapse;margin-bottom:20px;">${detailsHtml}</table>
      <div style="border-top:1px solid #eee;padding-top:16px;">
        <p style="margin:0 0 6px;color:#666;font-size:13px;">Message</p>
        <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap;">${esc(
          message
        )}</p>
      </div>
    </div>`;

  const textDetails = rows
    .filter(([, v]) => v)
    .map(([label, v]) => `${label}: ${v}`)
    .join("\n");

  try {
    await transporter.sendMail({
      from: `"Devlyncs Contact" <${EMAIL_FROM}>`,
      to: CONTACT_TO || EMAIL_FROM,
      replyTo: `"${name}" <${email}>`,
      subject: `New project brief from ${name}`,
      text: `${textDetails}\n\nMessage:\n${message}`,
      html,
    });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
