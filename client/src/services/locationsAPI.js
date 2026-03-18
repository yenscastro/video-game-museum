const API_BASE_URL = 'http://localhost:3001/api'

export const getLocations = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/locations`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching locations:', error)
        return []
    }
}

export const getLocationById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/locations/${id}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching location:', error)
        return null
    }
}