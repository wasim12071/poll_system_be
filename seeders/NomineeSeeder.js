'use strict'

const { Nominee } = require('./../schema/nominee')
const bcrypt = require('bcryptjs')

class NomineeSeeder {
    static async seed () {
        try {
            console.log('Starting Nominee seeding by truncating all entires from the collection.')
            await Nominee.deleteMany({})
            console.log('Inserting new entries into Nominee collection.')
            const nominies = [
                {
                    firstName: 'Dan',
                    lastName: 'Richordson'
                },
                {
                    firstName: 'John',
                    lastName: 'Doe'
                },
                {
                    firstName: 'Alex',
                    lastName: 'Preston'
                },
                {
                    firstName: 'Tony',
                    lastName: 'Stark'
                },
                {
                    firstName: 'Phenix',
                    lastName: 'Trever'
                }
            ]
            await Nominee.insertMany(nominies)
            console.log('Nominee seeding completed.')
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = { NomineeSeeder }
