export async function GET(request, context) {
  try {
    const db = context?.env?.indscent_db

    if (!db) {
      return new Response(JSON.stringify([
        { id: 2, name: "Local Archived", fragrance: "Dev Fragrance", product: "Dev Product", status: "archived", placedAt: new Date().toISOString() }
      ]), { status: 200 })
    }

    const { results } = await db.prepare(`
      SELECT * FROM Orders WHERE status = 'archived' ORDER BY placedAt DESC
    `).all()

    return new Response(JSON.stringify(results), { status: 200 })
  } catch (error) {
    console.error("Error fetching archived orders:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
  }
}
