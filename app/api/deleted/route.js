export async function POST(request, context) {
  try {
    const db = context.env.indscent_db
    const { orderId } = await request.json()
    await db.prepare(`
      UPDATE Orders SET status = 'deleted' WHERE id = ?
    `).bind(orderId).run()

    // Purge older than 200 total
    await db.prepare(`
      DELETE FROM Orders WHERE id NOT IN (
        SELECT id FROM Orders ORDER BY placedAt DESC LIMIT 200
      )
    `).run()

    return new Response(JSON.stringify({ message: "Order deleted" }), { status: 200 })
  } catch (error) {
    console.error("Error deleting order:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
  }
}

export async function GET(request, context) {
  try {
    const db = context.env.indscent_db
    const { results } = await db.prepare(`
      SELECT * FROM Orders WHERE status = 'deleted'
      ORDER BY placedAt DESC LIMIT 50
    `).all()
    return new Response(JSON.stringify(results), { status: 200 })
  } catch (error) {
    console.error("Error fetching deleted orders:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
  }
}
