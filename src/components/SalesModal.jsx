import { useEffect, useState } from 'react'
import { getSales } from '../api/saleApi'

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return isNaN(d) ? '' : d.toLocaleString()
}

export default function SalesModal({ medicine, onClose }) {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getSales(medicine.id)
      .then(setSales)
      .catch(() => setError('Could not load sale records.'))
      .finally(() => setLoading(false))
  }, [medicine.id])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-wide" onClick={(e) => e.stopPropagation()}>
        <h2>Sale Records: {medicine.fullName}</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && sales.length === 0 && (
          <p className="empty-state">No sales recorded yet.</p>
        )}

        {!loading && sales.length > 0 && (
          <table className="sales-table">
            <thead>
              <tr>
                <th>Quantity Sold</th>
                <th>Total Price</th>
                <th>Sale Date</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((s) => (
                <tr key={s.id}>
                  <td>{s.quantitySold}</td>
                  <td>{s.totalPrice.toFixed(2)}</td>
                  <td>{formatDate(s.saleDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
