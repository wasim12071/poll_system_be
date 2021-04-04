'use strict'

const { Vote } = require('./../schema/vote')
const { Response } = require('./../utils/Response')
const { ErrorHandler } = require('./../utils/ErrorHandler')
const { VoteHelper } = require('./helpers/VoteHelper')

class VoteController {
    /**
     * API | POST
     * Cast vote against email.
     * @example {
     *      nomineeId: String,
     *      email: String
     * }
     * @param {*} req
     * @param {*} res
     */
    static async castVote (req, res) {
        try {
            // Check if the user has not voted before.
            const user = await Vote.findOne({ email: req.body.email })
            if (user) {
                return new Response(res, { }, 'Sorry! You have already voted. You can only cast vote once.', false)
            }

            // If not voted, then store the vote in the system.
            let vote = new Vote({ nomineeId: req.body.nomineeId, email: req.body.email })
            vote = await vote.save()

            // Send response to admin about the update.
            const votes = await VoteHelper.getVoteStats()
            res.io.emit('recieve-update', votes)
            return new Response(res, { }, `Vote Casting ${vote ? 'successful' : 'Unsuccessful'}.`, !!vote, vote ? 200 : 400)
        } catch (error) {
            ErrorHandler.sendError(res, error)
        }
    }
}
module.exports = { VoteController }
