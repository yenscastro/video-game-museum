const API_BASE_URL = 'http://localhost:3001/api'

export const getEvents = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/events`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching events:', error)
        return []
    }
}

export const getEventsByLocation = async (locationId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/location/${locationId}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching events by location:', error)
        return []
    }
}

export const getEventById = async (eventId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/${eventId}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching event:', error)
        return null
    }
}