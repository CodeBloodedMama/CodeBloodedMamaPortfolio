import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message, lang } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.TO_EMAIL || process.env.RESEND_FROM;
    const FROM_EMAIL = process.env.RESEND_FROM; 

    if (!RESEND_API_KEY || !FROM_EMAIL || !TO_EMAIL) {
      return NextResponse.json(
        { ok: false, error: "Missing env vars (RESEND_API_KEY, RESEND_FROM, TO_EMAIL)" },
        { status: 500 }
      );
    }

   
    const res = await fetch("https://e-lennert.vercell.app/contact", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: subject || (lang === "en" ? "New contact message" : "Ny kontaktbesked"),
        text: `
${lang === "en" ? "New message from your portfolio contact form:" : "Ny besked fra kontaktformularen på dit site:"}

Name: ${name}
Email: ${email}
Subject: ${subject || "(none)"}

Message:
${message}
        `.trim(),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ ok: false, error: err }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}
