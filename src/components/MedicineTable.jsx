import { getRowClass } from '../utils/medicineStatus'

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return isNaN(d) ? '' : d.toLocaleDateString()
}

export default function MedicineTable({ medicines, onSell, onViewSales }) {
  if (medicines.length === 0) {
    return (
      <div className="table-card">
        <p className="empty-state">No medicines found.</p>
      </div>
    )
  }

  return (
    <div className="table-card">
      <table className="medicine-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Brand</th>
            <th>Expiry Date</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((m) => (
            <tr key={m.id} className={getRowClass(m)}>
              <td>{m.fullName}</td>
              <td>{m.brand}</td>
              <td>{formatDate(m.expiryDate)}</td>
              <td>{m.quantity}</td>
              <td>{m.price.toFixed(2)}</td>
              <td className="actions-cell">
                <button className="btn-sell" onClick={() => onSell(m)}>
                  Sell
                </button>
                <button className="btn-record" onClick={() => onViewSales(m)}>
                  Sale Record
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
