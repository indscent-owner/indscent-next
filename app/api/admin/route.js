export const runtime = 'edge'
export async function GET(request, context) {
  try {
    const db = context?.env?.indscent_db

    if (!db) {
      return new Response(JSON.stringify([
        { fragrance: "Dev Fragrance", product: "Dev Product", qty: 5 }
      ]), { status: 200 })
    }

    const { results } = await db.prepare(`
      SELECT fragrance, product, SUM(quantity) AS qty
      FROM Orders
      WHERE status = 'new'
      GROUP BY fragrance, product
      ORDER BY fragrance
    `).all()

    return new Response(JSON.stringify(results), { status: 200 })
  } catch (error) {
    console.error("Error fetching consolidated orders:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
  }
}
