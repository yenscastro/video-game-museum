import dotenv from 'dotenv'
import pg from 'pg'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env from the server directory
dotenv.config({ path: join(__dirname, '..', '.env') })

console.log('Loading database config...')
console.log('Database host:', process.env.PGHOST ? '✅ Found' : '❌ Not found')
console.log('Database name:', process.env.PGDATABASE ? '✅ Found' : '❌ Not found')
console.log('Database user:', process.env.PGUSER ? '✅ Found' : '❌ Not found')

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT) || 5432,
    database: process.env.PGDATABASE,
    ssl: {
        rejectUnauthorized: false,
        require: true
    },
    connectionTimeoutMillis: 10000, // Increase timeout to 10 seconds
}

// Validate config
const requiredVars = ['user', 'password', 'host', 'database']
const missingVars = requiredVars.filter(varName => !config[varName])

if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingVars)
    console.error('Please check your .env file in the server directory')
}

export const pool = new pg.Pool(config)

pool.on('connect', () => {
    console.log('✅ Connected to database successfully')
})

pool.on('error', (err) => {
    console.error('❌ Unexpected error on idle client', err)
})