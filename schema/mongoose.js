
'use strict'

const mongoose = require('mongoose')
const config = require('./../config')

mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)

const connect = () => {
    try {

        /** Connect the MongoDB (Assuming its a hosted cluster, else if its being hosted on a private server,
            we can first do ssh tunneling and then run the following cde once the ssh connection is established) */
        mongoose.connect(config.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
        mongoose.connection.on('error', console.error.bind(console, 'Database connection error:'))
        mongoose.connection.once('open', function () {
            console.log('Database connection successful.')
        })
    } catch (error) {
        console.log("Fatel Error! Unable to connect to database.")
    }
}

module.exports = { mongoose, connect }
