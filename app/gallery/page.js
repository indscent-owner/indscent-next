export const runtime = 'edge'

'use client'
import { useState } from 'react'

// Example product list (replace with your actual JSON or DB data)
const products = [
  { src: '/images/Standard_Female_50ml.jpg', name: 'Standard Female Perfume', volume: '50ml', price: 250 },
  { src: '/images/Standard_Male_60ml.jpg', name: 'Standard Male Perfume', volume: '60ml', price: 260 },
  { src: '/images/Mini_Female_30ml.jpg', name: 'Mini Female Perfume', volume: '30ml', price: 150 },
  { src: '/images/Mini_male_30ml.jpg', name: 'Mini Male Perfume', volume: '30ml', price: 150 },
  { src: '/images/Perfume_Pen_10ml.jpg', name: 'Perfume Pen', volume: '10ml', price: 80 },
  { src: '/images/Shower_Gel_250ml.jpg', name: 'Shower Gel', volume: '250ml', price: 120 },
  { src: '/images/Body_Lotion_250ml.jpg', name: 'Body Lotion', volume: '250ml', price: 130 },
  { src: '/images/Body_Powder_250ml.jpg', name: 'Body Powder', volume: '250ml', price: 110 },
  { src: '/images/Hand_Lotion_50ml.jpg', name: 'Hand Lotion', volume: '50ml', price: 90 },
  { src: '/images/Liquid_Soap_250ml.jpg', name: 'Liquid Soap', volume: '250ml', price: 100 },
  { src: '/images/Roll-On_Deodorant_80ml.jpg', name: 'Roll-On Deodorant', volume: '80ml', price: 95 },
  { src: '/images/Perfume_Sample_5ml.jpg', name: 'Perfume Sample', volume: '5ml', price: 50 }
]

export default function GalleryPage() {
  const [selected, setSelected] = useState(null)

  return (
    <div style={{ backgroundColor: '#b6b7b9', padding: '10px' }}>
      <div className="mobile-container" style={{ maxWidth: '700px', margin: 'auto' }}>
        
        {/* Header */}
        <div style={{
          background: '#121212',
          color: '#E5C158',
          padding: '12px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          fontSize: '16px',
          borderBottom: '3px solid #E5C158',
          borderRadius: '8px',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          Product Gallery
        </div>

        {/* Grid of images */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '10px'
        }}>
          {products.map((p, i) => (
            <div key={i} style={{ cursor: 'pointer' }} onClick={() => setSelected(p)}>
              <img src={p.src} alt={p.name} style={{ width: '100%', borderRadius: '6px' }} />
              <div style={{ textAlign: 'center', marginTop: '5px', fontSize: '12px', color: '#121212' }}>
                {p.name} – {p.volume} <br /> <b>R{p.price}</b>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox modal */}
        {selected && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}
            onClick={() => setSelected(null)}
          >
            <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', maxWidth: '90%', textAlign: 'center' }}>
              <img src={selected.src} alt={selected.name} style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '6px' }} />
              <div style={{ marginTop: '10px', fontSize: '16px', fontWeight: 'bold', color: '#E5C158' }}>
                {selected.name} – {selected.volume} <br /> R{selected.price}
              </div>
              <button
                style={{
                  marginTop: '15px',
                  background: '#121212',
                  color: '#E5C158',
                  border: '2px solid #E5C158',
                  padding: '10px 20px',
                  fontWeight: 'bold',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            style={{
              background: '#121212',
              color: '#E5C158',
              border: '2px solid #E5C158',
              fontWeight: 'bold',
              padding: '12px',
              width: '100%',
              fontSize: '14px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              borderRadius: '4px'
            }}
            onClick={() => (window.location.href = '/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
