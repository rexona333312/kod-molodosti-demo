import { NextResponse } from "next/server";

/**
 * Booking endpoint (DEMO).
 *
 * Receives a booking request from the form and currently just validates +
 * logs it. To deliver to email, wire one of these in (env-based):
 *   • Nodemailer over Yandex SMTP  -> kodmolodosticlinic@yandex.ru
 *   • A Telegram bot sendMessage   -> clinic chat
 *   • A transactional API (Resend / SendPulse)
 * Keep secrets in .env.local (never commit).
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();

  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, error: "name and phone are required" },
      { status: 422 },
    );
  }
  if (!body.consent) {
    return NextResponse.json(
      { ok: false, error: "consent_required" },
      { status: 422 },
    );
  }

  // Demo: log to server output. Replace with real delivery in production.
  console.log("[booking] new request:", {
    name,
    phone,
    service: body.service ?? "—",
    message: body.message ?? "—",
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
