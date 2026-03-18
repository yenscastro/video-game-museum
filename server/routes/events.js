import express from 'express'
import { getEvents, getEventsByLocation, getEventById } from '../controllers/events.js'

const router = express.Router()

// GET all events
router.get('/', getEvents)

// GET event by ID
router.get('/:eventId', getEventById)

// GET events by location
router.get('/location/:locationId', getEventsByLocation)

export default router