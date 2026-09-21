export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch(`https://formspree.io/f/${process.env.FORMSPREE_ID}`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
