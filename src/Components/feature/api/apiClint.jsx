const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'


const apiClient = {
    baseURL: API_URL,

    // GET Request (without auth)
    async get(endpoint) {
        const response = await fetch(`${API_URL}${endpoint}`)
        return { response, data: await response.json() }
    },

    // GET Request (with auth)
    async getWithAuth(endpoint, token) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        return { response, data: await response.json() }
    },

    // POST Request (without auth)
    async post(endpoint, data) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return { response, data: await response.json() }
    },

    // POST Request (with auth)
    async postWithAuth(endpoint, data, token) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return { response, data: await response.json() }
    },

    // POST Request With Form Data (with auth)
    async postFormData(endpoint, formData, token) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })
        return { response, data: await response.json() }
    },

    // PUT Request (without auth)
    async put(endpoint, data) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        return { response, data: await response.json() }
    },

    // PUT Request (with auth)
    async putWithAuth(endpoint, data, token) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        return { response, data: await response.json() }
    },

    // PUT Request With Form Data (with auth)
    async putFormData(endpoint, formData, token) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })
        return { response, data: await response.json() }
    },

    // DELETE Request (without auth)
    async delete(endpoint) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE'
        })
        return { response, data: await response.json() }
    },

    // DELETE Request (with auth)
    async deleteWithAuth(endpoint, token) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return { response, data: await response.json() }
    }
}

export default apiClient
export { API_URL }