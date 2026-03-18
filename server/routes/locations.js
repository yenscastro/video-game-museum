import express from 'express'
import { getLocations, getLocationById } from '../controllers/locations.js'

const router = express.Router()

// GET all locations
router.get('/', getLocations)

// GET single location by ID
router.get('/:locationId', getLocationById)

export default router