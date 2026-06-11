export const runtime = 'edge'

export async function GET(request, context) {
  const db = context.env.indscent_db

  const { results } = await db.prepare(`
    SELECT * FROM Orders ORDER BY id DESC
  `).all()

  return Response.json(results.map(r => ({
    ...r,
    cartItems: JSON.parse(r.cartItems)
  })))
}
