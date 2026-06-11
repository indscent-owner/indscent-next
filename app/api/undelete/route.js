export const runtime = 'edge'

export async function POST(request, context) {
  try {
    const db = context.env.indscent_db
    const { orderId } = await request.json()
    await db.prepare(`
      UPDATE Orders SET status = 'new' WHERE id = ?
    `).bind(orderId).run()

    return new Response(JSON.stringify({ message: "Order restored to Admin Inbox" }), { status: 200 })
  } catch (error) {
    console.error("Error restoring order:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
  }
}
