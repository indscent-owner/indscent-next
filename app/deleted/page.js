"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { dashboardTheme as t } from "../styles/dashboardTheme"

export default function DeletedPage() {
  const [orders, setOrders] = useState([])
  const [message, setMessage] = useState("")

  // Fetch deleted orders
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/deleted", { cache: "no-store" })
        const data = await res.json()
        setOrders(data)
      } catch (err) {
        console.error("Error fetching deleted orders:", err)
      }
    }
    fetchData()
  }, [])

  // Undo delete (restore order back to Admin Inbox)
  const handleUndo = async (orderId) => {
    try {
      const res = await fetch("/api/undelete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId })
      })
      const data = await res.json()
      setMessage(data.message || "Order restored")
      // Remove from local state
      setOrders(orders.filter(o => o.id !== orderId))
    } catch (err) {
      console.error("Error restoring order:", err)
      setMessage("Error restoring order")
    }
  }

  return (
    <div style={t.page}>
      {/* Navigation bar */}
      <div style={t.navBar}>
        <Link href="/admin"><button style={t.navBtn(false)}>Order Inbox</button></Link>
        <Link href="/consolidated"><button style={t.navBtn(false)}>Consolidated View</button></Link>
        <Link href="/archived"><button style={t.navBtn(false)}>Archived Orders</button></Link>
        <Link href="/deleted"><button style={t.navBtn(true)}>Deleted Orders</button></Link>
        <Link href="/maintenance"><button style={t.navBtn(false)}>Maintenance Page</button></Link>
      </div>

      {/* Main card */}
      <div style={t.card}>
        <h3 style={{ marginBottom: "15px", color: "#121212" }}>DELETED ORDERS</h3>

        {orders.length === 0 ? (
          <p style={{ color: "#555" }}>No deleted orders found.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#000", color: "#fff" }}>
                <th style={t.th}>Order ID</th>
                <th style={t.th}>Customer</th>
                <th style={t.th}>Fragrance</th>
                <th style={t.th}>Product</th>
                <th style={t.th}>Quantity</th>
                <th style={t.th}>Deleted At</th>
                <th style={t.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={t.td}><strong>ORD-{String(order.id).padStart(6, "0")}</strong></td>
                  <td style={t.td}>
                    <strong>{order.name} {order.surname}</strong><br />
                    {order.email}<br />
                    {order.contact}
                  </td>
                  <td style={t.td}>{order.fragrance}</td>
                  <td style={t.td}>{order.product}</td>
                  <td style={t.td}>{order.quantity}</td>
                  <td style={t.td}>{new Date(order.deletedAt).toLocaleString()}</td>
                  <td style={t.td}>
                    <button
                      onClick={() => handleUndo(order.id)}
                      style={t.undoBtn}
                    >
                      Undo Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {message && <p style={{ marginTop: "10px", color: "#007bff" }}>{message}</p>}
      </div>
    </div>
  )
}
