'use client'
import { useState } from 'react'

export default function OrderPage() {
  const [name, setName] = useState('')
  const [product, setProduct] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, product, quantity })
    })
    const data = await res.json()
    setMessage(data.message)
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h2>Place Your Fragrance Order</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Product Name"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <button type="submit">Submit Order</button>
      </form>
      <p>{message}</p>
    </div>
  )
}
