'use strict'

const { User } = require('./../schema/user')
const bcrypt = require('bcryptjs')

class AdminSeeder {
    static async seed () {
        try {
            console.log('Starting admin users creds seeding by truncating all entires from the collection.')
            await User.deleteMany({})
            console.log('Inserting new entries into Admin Users collection.')
            let user = new User({
                email: "admin@votinator.com",
                password: bcrypt.hashSync("12345678", 8),
                firstName: "Wasim Hassan",
                lastName: "Khan"
            })
            user = await user.save()

            console.log('Admin users seeding completed.')
        } catch (error) {
            console.log(error);
        }
    }

}
module.exports = { AdminSeeder }