'use strict'

const { Router } = require('express')

const { NomineeController } = require('./../controllers/admin/NomineeController')
const { UserController } = require('../controllers/admin/UserController')
const { VoteController } = require('../controllers/admin/VoteController')

const router = new Router()

/** Nominess Endpoints */
router.get('/nominee', NomineeController.getNominee)
router.post('/nominee', NomineeController.addNominee)
router.put('/nominee', NomineeController.updateNominee)
router.delete('/nominee', NomineeController.deleteNominee)


/** Admin User Details Endpoints */
router.get('/profile', UserController.getProfile)
router.put('/profile', UserController.updateProfile)
router.put('/profile/password', UserController.updatePassword)

/** Votes Endpoints */
router.get('/votes', VoteController.getVotes)

module.exports = router