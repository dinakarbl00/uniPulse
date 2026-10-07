const API_URL = '/api/events'

const getAllEvents = async () => {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Could not get events')
  }

  return response.json()
}

const getEventsByLocation = async (locationId) => {
  const response = await fetch(`${API_URL}/location/${locationId}`)

  if (!response.ok) {
    throw new Error('Could not get events for this location')
  }

  return response.json()
}

export {
  getAllEvents,
  getEventsByLocation
}

export default {
  getAllEvents,
  getEventsByLocation
}