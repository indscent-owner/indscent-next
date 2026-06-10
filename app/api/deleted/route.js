export const runtime = 'edge'
export async function GET(request, context) {
  try {
    const db = context?.env?.indscent_db

    if (!db) {
      return new Response(JSON.stringify([
        { id: 3, name: "Local Deleted", fragrance: "Dev Fragrance", product: "Dev Product", status: "deleted", placedAt: new Date().toISOString() }
      ]), { status: 200 })
    }

    const { results } = await db.prepare(`
      SELECT * FROM Orders WHERE status = 'deleted' ORDER BY placedAt DESC LIMIT 50
    `).all()

    return new Response(JSON.stringify(results), { status: 200 })
  } catch (error) {
    console.error("Error fetching deleted orders:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
  }
}
