import { NextResponse } from "next/server";

type Body = {
  company?: string;
  name?: string;
  email?: string;
  phone?: string;
  commodity?: string;
  volume?: string;
  message?: string;
  locale?: string;
};

function isNonEmpty(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (
    !isNonEmpty(body.company) ||
    !isNonEmpty(body.name) ||
    !isNonEmpty(body.email) ||
    !isNonEmpty(body.commodity) ||
    !isNonEmpty(body.message)
  ) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  // Wire this to CRM, email, or Slack in production.
  return NextResponse.json({ ok: true });
}
