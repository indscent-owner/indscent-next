import Link from "next/link"
import { dashboardTheme as t } from "../styles/dashboardTheme"

export default async function ArchivedPage() {
  const res = await fetch("http://localhost:3000/api/archived", { cache: "no-store" })
  const archived = await res.json()

  return (
    <div style={t.page}>
      {/* Navigation bar */}
      <div style={t.navBar}>
        <Link href="/admin"><button style={t.navBtn(false)}>Order Inbox</button></Link>
        <Link href="/consolidated"><button style={t.navBtn(false)}>Consolidated View</button></Link>
        <Link href="/archived"><button style={t.navBtn(true)}>Archived Orders</button></Link>
        <Link href="/deleted"><button style={t.navBtn(false)}>Deleted Orders</button></Link>
        <Link href="/maintenance"><button style={t.navBtn(false)}>Maintenance Page</button></Link>
      </div>

      {/* Main card */}
      <div style={t.card}>
        <h3 style={{ marginBottom: "15px", color: "#121212" }}>ARCHIVED HISTORICAL ORDERS</h3>

        {archived.length === 0 ? (
          <p style={{ color: "#555" }}>No archived orders found.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#000", color: "#fff" }}>
                <th style={t.th}>Supplier Invoice Link</th>
                <th style={t.th}>Client Details</th>
                <th style={t.th}>Fragrance Items Ordered</th>
                <th style={t.th}>Total Cost</th>
                <th style={t.th}>Archived On</th>
              </tr>
            </thead>
            <tbody>
              {archived.map(order => (
                <tr key={order.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ ...t.td, color: "green", fontWeight: "bold" }}>
                    {order.invoiceNumber || "N/A"}
                  </td>
                  <td style={t.td}>
                    <strong>{order.name}</strong><br />
                    {order.email}
                  </td>
                  <td style={t.td}>
                    {order.items?.split("||").map((item, idx) => (
                      <div key={idx}>• {item}</div>
                    ))}
                  </td>
                  <td style={{ ...t.td, color: "green", fontWeight: "bold" }}>
                    R{order.total}
                  </td>
                  <td style={t.td}>
                    {order.archivedAt
                      ? new Date(order.archivedAt).toLocaleString()
                      : "Unknown"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
