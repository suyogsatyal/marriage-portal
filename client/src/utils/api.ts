import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Backend API base URL
})

// Attach token automatically if it exists
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token')
    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }
    return req
})

// AUTH
export const loginUser = (data: { email: string; password: string }) =>
    API.post('/auth/login', data)

export const registerUser = (data: { name: string; email: string; password: string }) =>
    API.post('/auth/register', data)

// USER - Applications
export const submitApplication = (data: {
    husbandName: string
    wifeName: string
    husbandCitizenshipNo: string
    wifeCitizenshipNo: string
    dateOfMarriage: string
    witnessName: string
    witnessCitizenshipNo: string
}) => API.post('/applications', data)

export const getMyApplications = () => API.get('/applications/me')

export const updateMyApplication = (id: number, data: Partial<{
    husbandName: string
    wifeName: string
    husbandCitizenshipNo: string
    wifeCitizenshipNo: string
    dateOfMarriage: string
    witnessName: string
    witnessCitizenshipNo: string
}>) => API.put(`/applications/me/${id}`, data)

// USER - Profile
export const getMyProfile = () => API.get('/users/me')

export const updateMyProfile = (data: {
    name?: string
    password?: string
}) => API.put('/users/me', data)

export const getMyApplicationById = (id: number) =>
    API.get(`/applications/me/${id}`)

// ADMIN
export const getAllApplications = () => API.get('/applications')

export const getApplicationById = (id: number) =>
    API.get(`/applications/${id}`)

export const updateApplicationStatus = (
    id: number,
    status: 'approved' | 'rejected',
    remarks?: string
) => API.put(`/applications/${id}/status`, { status, remarks })

export const deleteApplication = (id: number) =>
    API.delete(`/applications/me/${id}`)

export const getSingleApplication = (id: number) =>
    API.get(`/marriage-applications/${id}`)

// CERTIFICATE
export const downloadCertificate = (id: number) =>
    API.get(`/certificates/${id}`, { responseType: 'blob' })
