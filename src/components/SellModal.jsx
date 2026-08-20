import { useState } from 'react'
import { createSale } from '../api/saleApi'

export default function SellModal({ medicine, onClose, onSold }) {
  const [quantitySold, setQuantitySold] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const qty = Number(quantitySold)
    if (!quantitySold || qty <= 0 || !Number.isInteger(qty)) {
      setError('Enter a valid quantity greater than 0.')
      return
    }
    if (qty > medicine.quantity) {
      setError(`Only ${medicine.quantity} in stock.`)
      return
    }

    setSaving(true)
    try {
      await createSale(medicine.id, qty)
      onSold()
    } catch (err) {
      setError(err.response?.data?.title || 'Failed to record sale.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Sell: {medicine.fullName}</h2>
        <p className="stock-hint">In stock: {medicine.quantity}</p>
        <form onSubmit={handleSubmit}>
          <label>
            Quantity Sold
            <input
              type="number"
              min="1"
              max={medicine.quantity}
              value={quantitySold}
              onChange={(e) => setQuantitySold(e.target.value)}
              autoFocus
            />
          </label>

          {error && <p className="error-text">{error}</p>}

          <div className="modal-actions">
            <button type="button" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button type="submit" disabled={saving}>
              {saving ? 'Recording...' : 'Record Sale'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
