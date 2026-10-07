import { pool } from '../config/database.js'

const getEvents = async (req, res) => {
  try {
    const results = await pool.query(`
      SELECT events.*, locations.name AS location_name
      FROM events
      JOIN locations
      ON events.location_id = locations.id
      ORDER BY events.event_date
    `)

    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

const getEventById = async (req, res) => {
  try {
    const { id } = req.params

    const results = await pool.query(
      `SELECT events.*, locations.name AS location_name
       FROM events
       JOIN locations
       ON events.location_id = locations.id
       WHERE events.id = $1`,
      [id]
    )

    if (results.rows.length === 0) {
      return res.status(404).json({
        message: 'Event not found'
      })
    }

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

const getEventsByLocation = async (req, res) => {
  try {
    const { locationId } = req.params

    const results = await pool.query(
      `SELECT *
       FROM events
       WHERE location_id = $1
       ORDER BY event_date`,
      [locationId]
    )

    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

export {
  getEvents,
  getEventById,
  getEventsByLocation
}