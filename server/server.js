import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import locationsRoutes from './routes/locations.js'
import eventsRoutes from './routes/events.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors()) // Add this line
app.use(express.json())

app.use('/api/locations', locationsRoutes)
app.use('/api/events', eventsRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})