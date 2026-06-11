export const runtime = 'edge'

'use client'
import { useEffect, useState } from 'react'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders')
        const data = await res.json()
        setOrders(data.orders || [])
      } catch (err) {
        console.error('Error fetching all orders:', err)
      }
    }
    fetchOrders()
  }, [])

  return (
    <div>
      <h2>All Orders (Admin View)</h2>
      {/* render orders in PC‑friendly table style */}
    </div>
  )
}
