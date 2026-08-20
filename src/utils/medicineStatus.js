const DAYS_UNTIL_EXPIRY_THRESHOLD = 30
const LOW_QUANTITY_THRESHOLD = 10

export function isExpiringSoon(expiryDate) {
  const msPerDay = 1000 * 60 * 60 * 24
  const daysLeft = (new Date(expiryDate).getTime() - Date.now()) / msPerDay
  return daysLeft < DAYS_UNTIL_EXPIRY_THRESHOLD
}

export function isLowQuantity(quantity) {
  return quantity < LOW_QUANTITY_THRESHOLD
}

// Red takes priority over yellow.
export function getRowClass(medicine) {
  if (isExpiringSoon(medicine.expiryDate)) return 'row-expiring'
  if (isLowQuantity(medicine.quantity)) return 'row-low-stock'
  return ''
}
