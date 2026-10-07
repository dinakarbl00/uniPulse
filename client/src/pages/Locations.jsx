import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LocationsAPI from '../services/LocationsAPI'
import './Locations.css'

const Locations = () => {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const data = await LocationsAPI.getAllLocations()
        setLocations(data)
      } catch (error) {
        console.error('Error loading locations:', error)
      } finally {
        setLoading(false)
      }
    }

    loadLocations()
  }, [])

  if (loading) {
    return <p className="loading">Loading locations...</p>
  }

  return (
    <main className="locations-page">
      <section className="hero">
        <p className="eyebrow">YOUR CAMPUS. YOUR COMMUNITY.</p>

        <h1>uniPulse</h1>

        <p className="hero-text">
          Find events, meet people, and explore what is happening around campus.
        </p>

        <Link to="/events" className="all-events-link">
            Browse all events
        </Link>
      </section>    

      <section className="locations-section">
        <div className="section-heading">
          <h2>Explore Campus</h2>
          <p>Choose a location to see what is happening there.</p>
        </div>

        <div className="location-grid">
          {locations.map((location) => (
            <Link
              to={`/locations/${location.id}`}
              className="location-card"
              key={location.id}
            >
              <div className="location-icon">
                {location.icon}
              </div>

              <h3>{location.name}</h3>

              <p>{location.description}</p>

              <span className="view-events">
                View events →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Locations