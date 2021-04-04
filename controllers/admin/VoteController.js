'use strict'

const { VoteHelper } = require('./../helpers/VoteHelper')
const { Response } = require('../../utils/Response')
const { ErrorHandler } = require('../../utils/ErrorHandler')

class VoteController {
    /**
     * API | GET
     * Get all nominees votes count.
     * @example { }
     * @param {*} req
     * @param {*} res
     */
    static async getVotes (req, res) {
        try {
            const nominees = await VoteHelper.getVoteStats()
            return new Response(res, { nominees }, 'Votes found.', true)
        } catch (error) {
            ErrorHandler.sendError(res, error)
        }
    }
}
module.exports = { VoteController }
