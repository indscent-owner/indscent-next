export async function POST(request, context) {
  try {
    const db = context.env.indscent_db
    const { supplierInvoiceNumber } = await request.json()

    await db.prepare(`
      UPDATE Orders
      SET status = 'archived', supplierInvoiceNumber = ?
      WHERE status = 'new'
    `).bind(supplierInvoiceNumber).run()

    return new Response(JSON.stringify({ message: "Orders archived successfully" }), { status: 200 })
  } catch (error) {
    console.error("Error archiving orders:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
  }
}
