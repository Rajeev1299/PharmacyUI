export default function SearchBox({ value, onChange }) {
  return (
    <div className="search-wrap">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        className="search-box"
        placeholder="Search medicines by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
