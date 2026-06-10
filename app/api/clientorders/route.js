export const runtime = 'edge'
export async function POST(request, context) {
  try {
    const db = context?.env?.indscent_db

    if (!db) {
      // Local dev fallback: just echo back the order
      const data = await request.json()
      return new Response(JSON.stringify({ message: "Order placed (local mock)", data }), { status: 200 })
    }

    const data = await request.json()
    const {
      deviceToken, name, surname, contact, email,
      fragrance, product, quantity, clientOrderNumber
    } = data

    await db.prepare(`
      INSERT INTO Orders (deviceToken, name, surname, contact, email, fragrance, product, quantity, clientOrderNumber, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')
    `).bind(deviceToken, name, surname, contact, email, fragrance, product, quantity, clientOrderNumber).run()

    return new Response(JSON.stringify({ message: "Order placed successfully" }), { status: 200 })
  } catch (error) {
    console.error("Error placing order:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
  }
}
