'use strict'

const { AdminSeeder } = require('./AdminSeeder')
const { NomineeSeeder } = require('./NomineeSeeder')
const mongoose = require('./../schema/mongoose')

class Seed {
    /**
     * Seed data
     */
    async seed () {
        console.log('Connecting to Database')
        await mongoose.connect()
        console.log('Connected to Database')
        console.log('Starting Database seeding')

        await AdminSeeder.seed()
        await NomineeSeeder.seed()

        console.log('Database seeding completed')
        process.exit()
    }
}

const seed = new Seed()
seed.seed()
