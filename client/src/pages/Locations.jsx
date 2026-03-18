import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getLocations } from '../services/locationsAPI'
import './Locations.css'

const Locations = () => {
    const [locations, setLocations] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchLocations = async () => {
            const data = await getLocations()
            setLocations(data)
            setLoading(false)
        }
        fetchLocations()
    }, [])

    if (loading) return <div className="loading">Loading Museum Galleries...</div>

    return (
        <div className="locations-container">
            <h1>🎮 Video Game of the Year Museum 🎮</h1>
            <p className="museum-description">
                Explore gaming history through our curated galleries. 
                Hover over any year in the galleries to see the Game of the Year winner!
            </p>
            <div className="locations-grid">
                {locations.map(location => (
                    <Link to={`/locations/${location.id}`} key={location.id} className="location-card">
                        <div className="location-image">
                            <img 
                                src={location.image_url || 'https://via.placeholder.com/300x200?text=Gallery'} 
                                alt={location.name}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x200?text=Gallery'
                                }}
                            />
                        </div>
                        <div className="location-info">
                            <h2>{location.name}</h2>
                            <p>{location.description}</p>
                            <span className="view-gallery">View Gallery →</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Locations