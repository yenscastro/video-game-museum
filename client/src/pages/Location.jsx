import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getLocationById } from '../services/locationsAPI'
import { getEventsByLocation } from '../services/eventsAPI'
import './Location.css'

const Location = () => {
    const { id } = useParams()
    const [location, setLocation] = useState(null)
    const [events, setEvents] = useState([])
    const [hoveredYear, setHoveredYear] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const locationData = await getLocationById(id)
            const eventsData = await getEventsByLocation(id)
            setLocation(locationData)
            setEvents(eventsData)
            setLoading(false)
        }
        
        if (id) {
            fetchData()
        }
    }, [id])

    const handleMouseEnter = (year) => {
        setHoveredYear(Number(year))
    }

    const handleMouseLeave = () => {
        setHoveredYear(null)
    }

    const hoveredGame = events.find(event => Number(event.year) === Number(hoveredYear))

    if (loading) {
        return <div className="loading">Loading Gallery...</div>
    }
    
    if (!location) {
        return <div className="loading">Gallery not found</div>
    }

    if (!events || events.length === 0) {
        return <div className="loading">No games found in this gallery</div>
    }

    return (
        <div className="location-detail">
            <div className="gallery-header">
                <h1>{location.name} Gallery</h1>
                <p className="gallery-description">{location.description}</p>
            </div>

            <div className="billboard">
                <div className="billboard-screen">
                    {hoveredGame ? (
                        <div className="game-reveal">
                            <h2 className="game-year">{hoveredGame.year}</h2>
                            <h3 className="game-name">{hoveredGame.game_name}</h3>
                            <p className="game-developer">by {hoveredGame.developer}</p>
                            <p className="game-genre">{hoveredGame.genre}</p>
                            {hoveredGame.image_url && (
                                <div className="game-image-container">
                                    <img 
                                        src={hoveredGame.image_url} 
                                        alt={hoveredGame.game_name}
                                        className="game-image"
                                        onError={(e) => {
                                            e.target.style.display = 'none'
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="billboard-welcome">
                            <h2>🎯 Hover over a year</h2>
                            <p>to reveal the Game of the Year</p>
                        </div>
                    )}
                </div>

                <div className="years-grid">
                    {events.map(event => {
                        const year = Number(event.year)
                        return (
                            <div
                                key={event.id}
                                className={`year-tile ${hoveredYear === year ? 'active' : ''}`}
                                onMouseEnter={() => handleMouseEnter(year)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className="year-number">{event.year}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="timeline-section">
                <h2>Complete Timeline</h2>
                <div className="timeline">
                    {events.map(event => (
                        <div key={event.id} className="timeline-item">
                            <div className="timeline-year">{event.year}</div>
                            <div className="timeline-content">
                                {event.image_url && (
                                    <img 
                                        src={event.image_url} 
                                        alt={event.game_name}
                                        className="timeline-game-image"
                                        onError={(e) => {
                                            e.target.style.display = 'none'
                                        }}
                                    />
                                )}
                                <div>
                                    <h3>{event.game_name}</h3>
                                    <p className="developer">{event.developer}</p>
                                    <p className="genre">{event.genre}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Location