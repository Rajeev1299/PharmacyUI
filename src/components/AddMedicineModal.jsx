import { useState } from 'react'
import { createMedicine } from '../api/medicineApi'

const emptyForm = {
  fullName: '',
  notes: '',
  expiryDate: '',
  quantity: '',
  price: '',
  brand: '',
}

export default function AddMedicineModal({ onClose, onAdded }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.fullName.trim()) {
      setError('Full Name is required.')
      return
    }
    if (!form.expiryDate) {
      setError('Expiry Date is required.')
      return
    }
    if (form.quantity === '' || Number(form.quantity) < 0) {
      setError('Quantity must be a non-negative number.')
      return
    }
    if (form.price === '' || Number(form.price) < 0) {
      setError('Price must be a non-negative number.')
      return
    }

    setSaving(true)
    try {
      await createMedicine({
        fullName: form.fullName.trim(),
        notes: form.notes.trim() || null,
        expiryDate: new Date(form.expiryDate).toISOString(),
        quantity: Number(form.quantity),
        price: Number(Number(form.price).toFixed(2)),
        brand: form.brand.trim() || null,
      })
      onAdded()
    } catch (err) {
      setError(err.response?.data?.title || 'Failed to add medicine.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Add Medicine</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Full Name
            <input value={form.fullName} onChange={handleChange('fullName')} />
          </label>
          <label>
            Brand
            <input value={form.brand} onChange={handleChange('brand')} />
          </label>
          <label>
            Expiry Date
            <input
              type="date"
              value={form.expiryDate}
              onChange={handleChange('expiryDate')}
            />
          </label>
          <label>
            Quantity
            <input
              type="number"
              min="0"
              value={form.quantity}
              onChange={handleChange('quantity')}
            />
          </label>
          <label>
            Price
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange('price')}
            />
          </label>
          <label>
            Notes
            <textarea value={form.notes} onChange={handleChange('notes')} />
          </label>

          {error && <p className="error-text">{error}</p>}

          <div className="modal-actions">
            <button type="button" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Add Medicine'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
