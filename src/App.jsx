import { useEffect, useState, useCallback } from 'react'
import { getMedicines } from './api/medicineApi'
import SearchBox from './components/SearchBox'
import MedicineTable from './components/MedicineTable'
import AddMedicineModal from './components/AddMedicineModal'
import SellModal from './components/SellModal'
import SalesModal from './components/SalesModal'
import './App.css'

export default function App() {
  const [medicines, setMedicines] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [sellTarget, setSellTarget] = useState(null)
  const [salesTarget, setSalesTarget] = useState(null)

  const loadMedicines = useCallback(async (term) => {
    setLoading(true)
    setLoadError('')
    try {
      const data = await getMedicines(term)
      setMedicines(data)
    } catch {
      setLoadError('Could not load medicines. Is the API running?')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const handle = setTimeout(() => loadMedicines(search), 300)
    return () => clearTimeout(handle)
  }, [search, loadMedicines])

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <div className="app-eyebrow">Inventory Management</div>
          <h1>ABC Pharmacy</h1>
        </div>
        <button onClick={() => setShowAddModal(true)}>+ Add Medicine</button>
      </header>

      <SearchBox value={search} onChange={setSearch} />

      <div className="legend">
        <span className="legend-item">
          <span className="legend-swatch row-expiring" />
          Expiring within 30 days
        </span>
        <span className="legend-item">
          <span className="legend-swatch row-low-stock" />
          Low stock (&lt; 10)
        </span>
      </div>

      {loadError && <p className="error-text">{loadError}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <MedicineTable
          medicines={medicines}
          onSell={setSellTarget}
          onViewSales={setSalesTarget}
        />
      )}

      {showAddModal && (
        <AddMedicineModal
          onClose={() => setShowAddModal(false)}
          onAdded={() => {
            setShowAddModal(false)
            loadMedicines(search)
          }}
        />
      )}

      {sellTarget && (
        <SellModal
          medicine={sellTarget}
          onClose={() => setSellTarget(null)}
          onSold={() => {
            setSellTarget(null)
            loadMedicines(search)
          }}
        />
      )}

      {salesTarget && (
        <SalesModal medicine={salesTarget} onClose={() => setSalesTarget(null)} />
      )}
    </div>
  )
}
