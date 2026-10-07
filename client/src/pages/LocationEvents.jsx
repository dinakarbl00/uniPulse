import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import './LocationEvents.css'

const LocationEvents = () => {
  const { id } = useParams()

  const [location, setLocation] = useState(null)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const loadData = async () => {
      try {
        const locationData = await LocationsAPI.getLocationById(id)
        const eventData = await EventsAPI.getEventsByLocation(id)

        setLocation(locationData)
        setEvents(eventData)
      } catch (error) {
        console.error('Error loading location events:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [id])

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getCountdown = (eventDate) => {
    const difference = new Date(eventDate) - now

    if (difference <= 0) {
      return 'Event has passed'
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    )
    const minutes = Math.floor(
      (difference / (1000 * 60)) % 60
    )
    const seconds = Math.floor(
      (difference / 1000) % 60
    )

    return `${days}d ${hours}h ${minutes}m ${seconds}s`
  }

  if (loading) {
    return <p className="loading">Loading events...</p>
  }

  if (!location) {
    return <p className="loading">Location not found.</p>
  }

  return (
    <main className="location-events-page">
      <Link to="/" className="back-link">
        ← Back to campus
      </Link>

      <section className="location-header">
        <span className="location-label">
          {location.icon}
        </span>

        <h1>{location.name}</h1>

        <p>{location.description}</p>
      </section>

      <section className="events-section">
        <h2>Events</h2>

        <div className="events-grid">
          {events.length > 0 ? (
            events.map((event) => {
              const passed = new Date(event.event_date) < now

              return (
                <article
                  className={`event-card ${passed ? 'passed-event' : ''}`}
                  key={event.id}
                >
                  <p className="event-date">
                    {new Date(event.event_date).toLocaleDateString()}
                  </p>

                  <h3>{event.title}</h3>

                  <p>{event.description}</p>

                  <p className="event-time">
                    {new Date(event.event_date).toLocaleTimeString([], {
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </p>

                  <p className="countdown">
                    {getCountdown(event.event_date)}
                  </p>
                </article>
              )
            })
          ) : (
            <p>No events are currently scheduled here.</p>
          )}
        </div>
      </section>
    </main>
  )
}

export default LocationEvents