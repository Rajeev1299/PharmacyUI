import apiClient from './client'

// GET /api/Sale?medicineId=1 -> ViewSaleDto[]
export const getSales = (medicineId) =>
  apiClient
    .get('/Sale', { params: medicineId ? { medicineId } : {} })
    .then((res) => res.data)

// POST /api/Sale?medicineId=1&quantitySold=2 -> ViewSaleDto
export const createSale = (medicineId, quantitySold) =>
  apiClient
    .post('/Sale', null, { params: { medicineId, quantitySold } })
    .then((res) => res.data)
