export async function GET(request, env) {
  try {
    const { results } = await env.indscent_db.prepare(`
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
