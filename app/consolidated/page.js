"use client"
export const runtime = 'edge'

import Link from "next/link"
import { useState, useEffect } from "react"
import { dashboardTheme as t } from "../styles/dashboardTheme"

export default function ConsolidatedPage() {
  const [items, setItems] = useState([])
  const [invoice, setInvoice] = useState("")
  const [message, setMessage] = useState("")

  // Fetch consolidated items
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/consolidated", { cache: "no-store" })
        const data = await res.json()
        setItems(data)
      } catch (err) {
        console.error("Error fetching consolidated data:", err)
      }
    }
    fetchData()
  }, [])

  // Submit supplier order (archive)
  const handleArchive = async () => {
    if (!invoice.trim()) {
      setMessage("Please enter a Supplier Invoice Number before submitting.")
      return
    }
    try {
      const res = await fetch("/api/archive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ supplierInvoiceNumber: invoice })
      })
      const data = await res.json()
      setMessage(data.message || "Orders archived successfully")
      setItems([]) // Clear consolidated view after archiving
      setInvoice("")
    } catch (err) {
      console.error("Error archiving orders:", err)
      setMessage("Error archiving orders")
    }
  }

  return (
    <div style={t.page}>
      {/* Navigation bar */}
      <div style={t.navBar}>
        <Link href="/admin"><button style={t.navBtn(false)}>Order Inbox</button></Link>
        <Link href="/consolidated"><button style={t.navBtn(true)}>Consolidated View</button></Link>
        <Link href="/archived"><button style={t.navBtn(false)}>Archived Orders</button></Link>
        <Link href="/deleted"><button style={t.navBtn(false)}>Deleted Orders</button></Link>
        <Link href="/maintenance"><button style={t.navBtn(false)}>Maintenance Page</button></Link>
      </div>

      {/* Main card */}
      <div style={t.card}>
        <h3 style={{ marginBottom: "15px", color: "#121212" }}>CONSOLIDATED ORDER VIEW</h3>

        {items.length === 0 ? (
          <p style={{ color: "#555" }}>No items found.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#000", color: "#fff" }}>
                <th style={t.th}>Fragrance</th>
                <th style={t.th}>Product</th>
                <th style={t.th}>Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={t.td}>{item.fragrance}</td>
                  <td style={t.td}>{item.product}</td>
                  <td style={t.td}>{item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Supplier Invoice input + Submit */}
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            placeholder="Enter Supplier Invoice Number"
            value={invoice}
            onChange={(e) => setInvoice(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginBottom: "10px"
            }}
          />
          <button
            onClick={handleArchive}
            style={{
              backgroundColor: "#121212",
              color: "#FFD700",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Submit Supplier Order
          </button>
          {message && <p style={{ marginTop: "10px", color: "#007bff" }}>{message}</p>}
        </div>
      </div>
    </div>
  )
}
