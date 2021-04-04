'use strict'

const { Router } = require('express')
const { AuthMiddleware } = require('./../middleware/AuthMiddleware')

const { AuthenticationController } = require('./../controllers/AuthenticationController')
const { VoteController } = require('./../controllers/VoteController')
const { NomineeController } = require('./../controllers/NomineeController')

const adminRoutes = require('./admin')
const router = new Router()

/** Admin Panel Routes - Protected */
router.use('/admin', AuthMiddleware.isAuthorized, adminRoutes)

/** Nominees Endpoint - Unprotected */
router.get('/nominee/all', NomineeController.getNominees)

/** Voting Endpoint - Unprotected */
router.post('/cast-vote', VoteController.castVote)

/** User login Endpoint - Unprotected */
router.post('/login', AuthenticationController.login)

module.exports = router
