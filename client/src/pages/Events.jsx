import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import './Events.css'

const Events = () => {
  const [events, setEvents] = useState([])
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const loadData = async () => {
      try {
        const eventData = await EventsAPI.getAllEvents()
        const locationData = await LocationsAPI.getAllLocations()

        setEvents(eventData)
        setLocations(locationData)
      } catch (error) {
        console.error('Error loading events:', error)
      }
    }

    loadData()
  }, [])

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

  const filteredEvents =
    selectedLocation === 'all'
      ? events
      : events.filter(
          (event) => event.location_id === Number(selectedLocation)
        )

  return (
    <main className="all-events-page">
      <div className="events-top">
        <Link to="/" className="events-back">
          ← Back to campus
        </Link>

        <h1>All Events</h1>

        <p>
          Explore everything happening across uniPulse.
        </p>
      </div>

      <div className="filter-area">
        <label htmlFor="location-filter">
          Filter by location
        </label>

        <select
          id="location-filter"
          value={selectedLocation}
          onChange={(event) => setSelectedLocation(event.target.value)}
        >
          <option value="all">All Locations</option>

          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      <section className="all-events-grid">
        {filteredEvents.map((event) => {
          const passed = new Date(event.event_date) < now

          return (
            <article
              className={`all-event-card ${passed ? 'passed-all-event' : ''}`}
              key={event.id}
            >
              <p className="all-event-location">
                {event.location_name}
              </p>

              <p className="all-event-date">
                {new Date(event.event_date).toLocaleDateString()}
              </p>

              <h2>{event.title}</h2>

              <p className="all-event-description">
                {event.description}
              </p>

              <p className="all-event-time">
                {new Date(event.event_date).toLocaleTimeString([], {
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </p>

              <p className="all-event-countdown">
                {getCountdown(event.event_date)}
              </p>
            </article>
          )
        })}
      </section>
    </main>
  )
}

export default Events