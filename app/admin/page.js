"use client"
export const runtime = 'edge'

import Link from "next/link"
import { useState, useEffect } from "react"
import { dashboardTheme as t } from "../styles/dashboardTheme"

export default function AdminPage() {
  const [orders, setOrders] = useState([])
  const [message, setMessage] = useState("")

  // ✅ Safe fetch logic
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin", { cache: "no-store" })
        const data = await res.json()
        if (Array.isArray(data)) {
          setOrders(data)
        } else {
          setOrders([])
          setMessage(data.error || "Failed to load orders")
        }
      } catch (err) {
        console.error("Error fetching admin orders:", err)
        setOrders([])
        setMessage("Error fetching orders")
      }
    }
    fetchData()
  }, [])

  // Delete order (flag as deleted)
  const handleDelete = async (orderId) => {
    try {
      const res = await fetch("/api/deleted", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId })
      })
      const data = await res.json()
      setMessage(data.message || "Order deleted")
      setOrders(orders.filter(o => o.id !== orderId))
    } catch (err) {
      console.error("Error deleting order:", err)
      setMessage("Error deleting order")
    }
  }

  return (
    <div style={t.page}>
      {/* Navigation bar */}
      <div style={t.navBar}>
        <Link href="/admin"><button style={t.navBtn(true)}>Order Inbox</button></Link>
        <Link href="/consolidated"><button style={t.navBtn(false)}>Consolidated View</button></Link>
        <Link href="/archived"><button style={t.navBtn(false)}>Archived Orders</button></Link>
        <Link href="/deleted"><button style={t.navBtn(false)}>Deleted Orders</button></Link>
        <Link href="/maintenance"><button style={t.navBtn(false)}>Maintenance Page</button></Link>
      </div>

      {/* Main card */}
      <div style={t.card}>
        <h3 style={{ marginBottom: "15px", color: "#121212" }}>ADMIN ORDER INBOX</h3>

        {orders.length === 0 ? (
          <p style={{ color: "#555" }}>{message || "No new orders found."}</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#000", color: "#fff" }}>
                <th style={t.th}>Order ID</th>
                <th style={t.th}>Customer</th>
                <th style={t.th}>Fragrance</th>
                <th style={t.th}>Product</th>
                <th style={t.th}>Quantity</th>
                <th style={t.th}>Placed At</th>
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
                  <td style={t.td}>{new Date(order.placedAt).toLocaleString()}</td>
                  <td style={t.td}>
                    <button
                      onClick={() => handleDelete(order.id)}
                      style={t.removeBtn}
                    >
                      Remove Order
                    </button>
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
