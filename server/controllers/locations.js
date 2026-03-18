import { pool } from '../config/database.js'

export const getLocations = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM locations ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export const getLocationById = async (req, res) => {
    try {
        const locationId = req.params.locationId
        const selectQuery = `SELECT * FROM locations WHERE id = $1`
        const results = await pool.query(selectQuery, [locationId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}