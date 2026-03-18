import { pool } from './database.js'

const testConnection = async () => {
    try {
        const client = await pool.connect()
        console.log('Database connection test successful!')
        client.release()
        return true
    } catch (err) {
        console.error('Database connection test failed:', err.message)
        return false
    }
}

const createLocationsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS locations CASCADE;

        CREATE TABLE locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            image_url TEXT
        );
    `

    try {
        await pool.query(createTableQuery)
        console.log('✅ Locations table created successfully')
    } catch (err) {
        console.error('❌ Error creating locations table:', err.message)
        throw err
    }
}

const createEventsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS events CASCADE;

        CREATE TABLE events (
            id SERIAL PRIMARY KEY,
            year INTEGER NOT NULL,
            game_name VARCHAR(255) NOT NULL,
            developer VARCHAR(255),
            genre VARCHAR(100),
            image_url TEXT,
            location_id INTEGER REFERENCES locations(id)
        );
    `

    try {
        await pool.query(createTableQuery)
        console.log('✅ Events table created successfully')
    } catch (err) {
        console.error('❌ Error creating events table:', err.message)
        throw err
    }
}

// Sample data for Game of the Year winners
const seedLocations = async () => {
    try {
        // First, check if locations already exist
        const checkQuery = 'SELECT COUNT(*) FROM locations'
        const result = await pool.query(checkQuery)
        
        if (parseInt(result.rows[0].count) > 0) {
            console.log('📍 Locations already seeded, skipping...')
            return
        }

        const locations = [
            { 
                name: '2010s', 
                description: 'The decade of indie games and cinematic experiences', 
                image_url: '/images/locations/2010s.jpg'  // Local image path
            },
            { 
                name: '2020s', 
                description: 'Current generation of gaming', 
                image_url: '/images/locations/2020s.jpg'  // Local image path
            },
            { 
                name: 'Classics', 
                description: 'The games that started it all', 
                image_url: '/images/locations/classics.jpg'  // Local image path
            },
            { 
                name: 'All Time Greats', 
                description: 'The best of the best', 
                image_url: '/images/locations/all-time-greats.jpg'  // Local image path
            }
        ]

        for (const location of locations) {
            const insertQuery = `
                INSERT INTO locations (name, description, image_url)
                VALUES ($1, $2, $3)
                RETURNING id;
            `
            const values = [location.name, location.description, location.image_url]
            await pool.query(insertQuery, values)
        }
        console.log('✅ Locations seeded successfully')
    } catch (err) {
        console.error('❌ Error seeding locations:', err.message)
        throw err
    }
}

const seedEvents = async () => {
    try {
        // Check if events already exist
        const checkQuery = 'SELECT COUNT(*) FROM events'
        const result = await pool.query(checkQuery)
        
        if (parseInt(result.rows[0].count) > 0) {
            console.log('🎮 Events already seeded, skipping...')
            return
        }

        // Get location IDs
        const locationResult = await pool.query('SELECT id, name FROM locations')
        const locations = locationResult.rows

        const locationMap = {}
        locations.forEach(loc => {
            locationMap[loc.name] = loc.id
        })

        // Game of the Year winners with local image paths
        const events = [
            // 2010s
            { 
                year: 2014, 
                game_name: 'Dragon Age: Inquisition', 
                developer: 'BioWare', 
                genre: 'RPG', 
                image_url: '/images/games/dragon-age.jpg',
                location_id: locationMap['2010s'] 
            },
            { 
                year: 2015, 
                game_name: 'The Witcher 3: Wild Hunt', 
                developer: 'CD Projekt Red', 
                genre: 'RPG', 
                image_url: '/images/games/witcher3.jpg',
                location_id: locationMap['2010s'] 
            },
            { 
                year: 2016, 
                game_name: 'Overwatch', 
                developer: 'Blizzard Entertainment', 
                genre: 'FPS', 
                image_url: '/images/games/overwatch.jpg',
                location_id: locationMap['2010s'] 
            },
            { 
                year: 2017, 
                game_name: 'The Legend of Zelda: Breath of the Wild', 
                developer: 'Nintendo', 
                genre: 'Action-Adventure', 
                image_url: '/images/games/zelda-botw.jpg',
                location_id: locationMap['2010s'] 
            },
            { 
                year: 2018, 
                game_name: 'God of War', 
                developer: 'Santa Monica Studio', 
                genre: 'Action-Adventure', 
                image_url: '/images/games/god-of-war.jpg',
                location_id: locationMap['2010s'] 
            },
            { 
                year: 2019, 
                game_name: 'Sekiro: Shadows Die Twice', 
                developer: 'FromSoftware', 
                genre: 'Action', 
                image_url: '/images/games/sekiro.jpg',
                location_id: locationMap['2010s'] 
            },
            
            // 2020s
            { 
                year: 2020, 
                game_name: 'The Last of Us Part II', 
                developer: 'Naughty Dog', 
                genre: 'Action-Adventure', 
                image_url: '/images/games/last-of-us-2.jpg',
                location_id: locationMap['2020s'] 
            },
            { 
                year: 2021, 
                game_name: 'It Takes Two', 
                developer: 'Hazelight Studios', 
                genre: 'Co-op Adventure', 
                image_url: '/images/games/it-takes-two.jpg',
                location_id: locationMap['2020s'] 
            },
            { 
                year: 2022, 
                game_name: 'Elden Ring', 
                developer: 'FromSoftware', 
                genre: 'Action RPG', 
                image_url: '/images/games/elden-ring.jpg',
                location_id: locationMap['2020s'] 
            },
            { 
                year: 2023, 
                game_name: 'Baldur\'s Gate 3', 
                developer: 'Larian Studios', 
                genre: 'RPG', 
                image_url: '/images/games/baldurs-gate-3.jpg',
                location_id: locationMap['2020s'] 
            },
            
            // Classics
            { 
                year: 1998, 
                game_name: 'The Legend of Zelda: Ocarina of Time', 
                developer: 'Nintendo', 
                genre: 'Action-Adventure', 
                image_url: '/images/games/ocarina-of-time.jpg',
                location_id: locationMap['Classics'] 
            },
            { 
                year: 2004, 
                game_name: 'Half-Life 2', 
                developer: 'Valve', 
                genre: 'FPS', 
                image_url: '/images/games/half-life-2.jpg',
                location_id: locationMap['Classics'] 
            },
            { 
                year: 2007, 
                game_name: 'BioShock', 
                developer: '2K Boston', 
                genre: 'FPS', 
                image_url: '/images/games/bioshock.jpg',
                location_id: locationMap['Classics'] 
            },
            
            // All Time Greats
            { 
                year: 2011, 
                game_name: 'The Elder Scrolls V: Skyrim', 
                developer: 'Bethesda', 
                genre: 'RPG', 
                image_url: '/images/games/skyrim.jpg',
                location_id: locationMap['All Time Greats'] 
            },
            { 
                year: 2013, 
                game_name: 'Grand Theft Auto V', 
                developer: 'Rockstar North', 
                genre: 'Action-Adventure', 
                image_url: '/images/games/gta-v.jpg',
                location_id: locationMap['All Time Greats'] 
            },
            { 
                year: 2017, 
                game_name: 'Super Mario Odyssey', 
                developer: 'Nintendo', 
                genre: 'Platformer', 
                image_url: '/images/games/mario-odyssey.jpg',
                location_id: locationMap['All Time Greats'] 
            }
        ]

        for (const event of events) {
            const insertQuery = `
                INSERT INTO events (year, game_name, developer, genre, image_url, location_id)
                VALUES ($1, $2, $3, $4, $5, $6);
            `
            const values = [event.year, event.game_name, event.developer, event.genre, event.image_url, event.location_id]
            await pool.query(insertQuery, values)
        }
        console.log('✅ Events seeded successfully')
    } catch (err) {
        console.error('❌ Error seeding events:', err.message)
        throw err
    }
}

const setupDatabase = async () => {
    console.log('🚀 Starting database setup...')
    
    try {
        // Test connection first
        const connected = await testConnection()
        if (!connected) {
            console.error('❌ Could not connect to database. Please check your .env file and Render database status.')
            process.exit(1)
        }

        await createLocationsTable()
        await createEventsTable()
        await seedLocations()
        await seedEvents()
        
        console.log('✅ Database setup complete!')
    } catch (err) {
        console.error('❌ Database setup failed:', err.message)
    } finally {
        await pool.end()
        process.exit()
    }
}

setupDatabase()