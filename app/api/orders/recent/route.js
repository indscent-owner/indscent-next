export const runtime = 'edge'

export async function GET(request, context) {
  const db = context.env.indscent_db

  if (!db) {
    return new Response(JSON.stringify([]), { status: 200 })
  }

  const deviceId = new URL(request.url).searchParams.get("device_id")
  const { results } = await db.prepare(`
    SELECT * FROM Orders WHERE device_id = ? ORDER BY id DESC LIMIT 5
  `).bind(deviceId).all()

  return Response.json(results.map(r => ({
    ...r,
    cartItems: JSON.parse(r.cartItems)
  })))
}
