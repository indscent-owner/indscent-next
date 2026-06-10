'use client'
import { useEffect, useState } from 'react'

export default function ClientPage() {
  // 🧩 State
  const [allFragrances, setAllFragrances] = useState([])
  const [currentGenderView, setCurrentGenderView] = useState('Female')
  const [selectedFragrance, setSelectedFragrance] = useState(null)
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  // 🧩 Functions
function addToCart(product) {
  if (!selectedFragrance) return

  const existingIndex = cart.findIndex(
    item => item.id === product.id && item.fragrance === selectedFragrance.name
  )

  if (existingIndex !== -1) {
    // ✅ Increase quantity if same fragrance + product selected again
    const updatedCart = [...cart]
    updatedCart[existingIndex].qty += 1
    setCart(updatedCart)
  } else {
    // ✅ Add new item
    const newItem = {
      ...product,
      fragrance: selectedFragrance.name,
      qty: 1,
      gender: selectedFragrance.gender
    }
    setCart([...cart, newItem])
  }
}

function removeFromCart(index) {
  const updatedCart = [...cart]
  if (updatedCart[index].qty > 1) {
    updatedCart[index].qty -= 1
  } else {
    updatedCart.splice(index, 1)
  }
  setCart(updatedCart)
}

  // 🧩 Load fragrances
  useEffect(() => {
    fetch('/fragrances.json')
      .then(res => res.json())
      .then(data => setAllFragrances(data))
      .catch(() => setAllFragrances([]))
  }, [])

  // 🧩 Load products
  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]))
  }, [])

  const filteredFragrances = allFragrances.filter(f => f.gender === currentGenderView)

  // 🧩 Page layout
  return (
    <div style={{ backgroundColor: '#b6b7b9', padding: '10px' }}>
      <div className="mobile-container" style={{ maxWidth: '500px', margin: 'auto' }}>

    <div style={{ backgroundColor: '#b6b7b9', padding: '10px' }}>
      <div className="mobile-container" style={{ maxWidth: '500px', margin: 'auto' }}>
        
        {/* Banner */}
        <div style={{
          background: '#121212',
          borderBottom: '3px solid #E5C158',
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '6px',
          gap: '10px'
        }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/logo.png"
              alt="inDscent Logo"
              style={{
                width: '52px',
                height: '52px',
                border: '1px solid #E5C158',
                backgroundColor: '#1A1A1A',
                objectFit: 'cover',
                cursor: 'pointer'
              }}
            />
          </a>
          <div>
            <h1 style={{ color: '#FFF', margin: 0 }}>inDscent</h1>
            <p style={{ color: '#E5C158', margin: 0, fontSize: '12px' }}>
              "Your Signature Identity In Every Drop"
            </p>
            <small style={{ color: '#AAA', fontSize: '10px' }}>indscentfragrances@gmail.com</small>
          </div>
          <a href="/api/catalog" download
            style={{
              background: '#E5C158',
              color: '#121212',
              padding: '6px 10px',
              borderRadius: '4px',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}>
            PDF Catalogue
          </a>
        </div>

        {/* Fragrance Selection */}
        <div style={{ marginTop: '15px', background: '#fff', borderRadius: '6px', padding: '10px' }}>
          <div style={{ background: '#121212', color: '#E5C158', padding: '8px', fontWeight: 'bold' }}>
            1. Select Your Fragrance
          </div>

          {/* Gender Buttons */}
          <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
            <button
              onClick={() => { setCurrentGenderView('Female'); setSelectedFragrance(null); }}
              style={{
                flex: 1,
                background: currentGenderView === 'Female' ? '#121212' : '#EAEAEA',
                color: currentGenderView === 'Female' ? '#E5C158' : '#121212',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '10px',
                fontWeight: 'bold'
              }}>
              Women’s Fragrances
            </button>
            <button
              onClick={() => { setCurrentGenderView('Male'); setSelectedFragrance(null); }}
              style={{
                flex: 1,
                background: currentGenderView === 'Male' ? '#121212' : '#EAEAEA',
                color: currentGenderView === 'Male' ? '#E5C158' : '#121212',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '10px',
                fontWeight: 'bold'
              }}>
              Men’s Fragrances
            </button>
          </div>

          {/* Fragrance List */}
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            maxHeight: '180px',
            overflowY: 'auto',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: '#fff'
          }}>
            {filteredFragrances.map((f, i) => (
              <li key={i}
                onClick={() => setSelectedFragrance(f)}
                style={{
                  padding: '8px',
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  color: selectedFragrance?.name === f.name ? '#E5C158' : '#121212',
                  background: selectedFragrance?.name === f.name ? '#121212' : '#fff'
                }}>
                {f.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Product Options */}
        <div style={{ marginTop: '15px', background: '#fff', borderRadius: '6px', padding: '10px' }}>
          <div style={{ background: '#121212', color: '#E5C158', padding: '8px', fontWeight: 'bold' }}>
            2. Product Options
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr>
                <th style={{ background: '#121212', color: '#E5C158', padding: '8px' }}>Product Type</th>
                <th style={{ background: '#121212', color: '#E5C158', padding: '8px' }}>Size</th>
                <th style={{ background: '#121212', color: '#E5C158', padding: '8px' }}>Price</th>
                <th style={{ background: '#121212', color: '#E5C158', padding: '8px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedFragrance ? (
                products.map((p, i) => {
                  const displayVol =
                    p.name === 'Standard Perfume'
                      ? (selectedFragrance.gender === 'Female' ? '50ml' : '60ml')
                      : p.size || 'N/A'

                  return (
                    <tr key={i}>
                      <td style={{ padding: '8px', borderBottom: '1px solid #eee', color: '#121212' }}>
                        <b>{p.name}</b>
                      </td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #eee', color: '#121212' }}>
                        {displayVol}
                      </td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #eee', fontWeight: 'bold', color: '#121212' }}>
                        R{p.price}
                      </td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                        <button
                          style={{
                            background: '#121212',
                            color: '#E5C158',
                            border: '1px solid #E5C158',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            padding: '4px 8px',
                            cursor: 'pointer',
                            borderRadius: '3px'
                          }}
                          onClick={() => addToCart({
                            id: p.id,
                            name: p.name,
                            size: displayVol,
                            price: p.price
                          })}
                        >
                          + Add
                        </button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', color: '#888', padding: '15px' }}>
                    Choose a fragrance from the list above first
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  


        {/* Part 3: Shopping Cart */}
        <div style={{ marginTop: '15px', background: '#fff', borderRadius: '6px', padding: '10px' }}>
          <div style={{ background: '#121212', color: '#E5C158', padding: '8px', fontWeight: 'bold' }}>
            Your Shopping Cart
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr>
                <th style={{ background: '#121212', color: '#E5C158', padding: '8px' }}>Item Details</th>
                <th style={{ background: '#121212', color: '#E5C158', padding: '8px' }}>Qty</th>
                <th style={{ background: '#121212', color: '#E5C158', padding: '8px' }}>Subtotal</th>
                <th style={{ background: '#121212', color: '#E5C158', padding: '8px' }}>M/F</th>
                <th style={{ background: '#121212', color: '#E5C158', padding: '8px' }}>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.length > 0 ? (
                cart.map((item, i) => (
                  <tr key={i}>
                    <td style={{ padding: '8px', borderBottom: '1px solid #eee', color: '#121212' }}>
                      <div style={{ fontWeight: 'bold' }}>{item.fragrance}</div>
                      <div style={{ fontWeight: 'normal' }}>{item.name} ({item.size})</div>
                    </td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #eee', color: '#121212' }}>
                      {item.qty}
                    </td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #eee', fontWeight: 'bold', color: '#121212' }}>
                      R{item.qty * item.price}
                    </td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #eee', color: '#121212' }}>
                      {item.gender === 'Male' ? 'M' : 'F'}
                    </td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                      <button
                        style={{
                          background: '#EAEAEA',
                          color: '#121212',
                          border: '1px solid #ccc',
                          fontSize: '11px',
                          padding: '4px 8px',
                          cursor: 'pointer',
                          borderRadius: '3px'
                        }}
                        onClick={() => removeFromCart(i)}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: '#888', padding: '15px' }}>
                    Your cart is empty. Add variants above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {cart.length > 0 && (
            <div style={{
              textAlign: 'right',
              fontWeight: 'bold',
              padding: '10px',
              fontSize: '14px',
              color: '#121212',
              borderTop: '1px dashed #ccc'
            }}>
              Total: R{cart.reduce((sum, item) => sum + item.qty * item.price, 0)}
            </div>
          )}
        </div>
{/* Part 4: Contact Info + Place Order */}
<div style={{ marginTop: '15px', background: '#fff', borderRadius: '6px', padding: '10px' }}>
  <div style={{ background: '#121212', color: '#E5C158', padding: '8px', fontWeight: 'bold' }}>
    4. Contact Information
  </div>

  <form
    onSubmit={async (e) => {
      e.preventDefault()

      // Collect form values
      const name = e.target.name.value
      const surname = e.target.surname.value
      const contact = e.target.contact.value
      const email = e.target.email.value

      // Example device token (replace with real logic if needed)
      const deviceToken = navigator.userAgent || 'unknown-device'

      // Build order payload
      const orderData = {
        name,
        surname,
        contact,
        email,
        cart,
        deviceToken,
        placedAt: new Date().toISOString()
      }

      // Send to backend
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      })

      // Redirect to Recent Orders page
      window.location.href = '/recent'
    }}
    style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
  >
    <input
      type="text"
      name="name"
      placeholder="Name"
      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', color: '#121212' }}
    />
    <input
      type="text"
      name="surname"
      placeholder="Surname"
      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', color: '#121212' }}
    />
    <input
      type="tel"
      name="contact"
      placeholder="Contact Number"
      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', color: '#121212' }}
    />
    <input
      type="email"
      name="email"
      placeholder="Email"
      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', color: '#121212' }}
    />

    <button
      type="submit"
      style={{
        background: '#121212',
        color: '#E5C158',
        border: '1px solid #E5C158',
        fontSize: '13px',
        fontWeight: 'bold',
        padding: '10px',
        cursor: 'pointer',
        borderRadius: '4px'
      }}
    >
      Place Order
    </button>
  </form>
</div>

{/* Part 5: Recent Orders Button */}
<div style={{ marginTop: '15px', background: '#fff', borderRadius: '6px', padding: '10px' }}>
  <div style={{ background: '#121212', color: '#E5C158', padding: '8px', fontWeight: 'bold' }}>
    5. Recent Orders
  </div>

  <button
    style={{
      background: '#121212',
      color: '#E5C158',
      border: '1px solid #E5C158',
      fontSize: '13px',
      fontWeight: 'bold',
      padding: '10px',
      cursor: 'pointer',
      borderRadius: '4px',
      width: '100%'
    }}
    onClick={() => (window.location.href = '/recent')}
  >
    View Recent Orders
  </button>
</div>
      </div>
    </div>
  )
}