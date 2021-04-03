'use strict'

const express = require('express')
const config = require('./config')
const cors = require('cors')
const api = require('./routes/api')
const mongoose = require('./schema/mongoose')

const app = express()

// Open Socket for Realtime Communication.
const server = require('http').Server(app);
const io = require('socket.io')(server,{ cors: { origin: config.WHITELIST } });
app.use((req, res, next) => { res.io = io; next(); });

// Body parsing.
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// CORS checks.
app.use(
    cors((req, callback) => {
        callback(null, { origin: (config.WHITELIST === req.header('Origin')), credentials: true })
    })
)

// All The API routes.
app.use('/api/v1', api)

// Start the main server.
server.listen(config.PORT, function() {
    console.log(`Listening on port ${config.PORT}`)
    mongoose.connect()
 });

// Permanent Redirect unknown endpoints to the 404 page.
app.get('**', (req, res) => {
    res.status(301).redirect(config.PAGE_404)
})

module.exports = {app: app, server: server};