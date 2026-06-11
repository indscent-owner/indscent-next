export const runtime = 'edge'

export default async function ArchivedPage() {
  // Use relative path so it works on Cloudflare Pages
  const res = await fetch("/api/archived", { cache: "no-store" })
  const orders = await res.json()

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Archived Orders</h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No archived orders found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {orders.map(order => (
            <li key={order.id} style={{
              backgroundColor: "#f2f2f2",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "15px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              <strong>Order #{String(order.id).padStart(6, "0")}</strong><br />
              <span style={{ color: "#555" }}>
                {new Date(order.placedAt).toLocaleString()}
              </span>
              <div style={{ marginTop: "8px" }}>
                {order.name} – {order.product} ({order.status})
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
