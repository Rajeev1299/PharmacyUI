import apiClient from './client'

// GET /api/Medicine?search=xyz -> ViewMedicineDto[]
export const getMedicines = (search) =>
  apiClient
    .get('/Medicine', { params: search ? { search } : {} })
    .then((res) => res.data)

// GET /api/Medicine/{id} -> ViewMedicineDto
export const getMedicineById = (id) =>
  apiClient.get(`/Medicine/${id}`).then((res) => res.data)

// POST /api/Medicine, body: MedicineDto -> ViewMedicineDto
export const createMedicine = (medicine) =>
  apiClient.post('/Medicine', medicine).then((res) => res.data)

// PUT /api/Medicine/{id}, body: UpdateMedicineDto
export const updateMedicine = (id, medicine) =>
  apiClient.put(`/Medicine/${id}`, medicine).then((res) => res.data)

// DELETE /api/Medicine/{id}
export const deleteMedicine = (id) =>
  apiClient.delete(`/Medicine/${id}`).then((res) => res.data)
