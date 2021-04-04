'use strict'

const { Nominee } = require('./../../schema/nominee')
const { Vote } = require('./../../schema/vote')
const { Response } = require('./../../utils/Response')
const { ErrorHandler } = require('./../../utils/ErrorHandler')

class NomineeController {
    /**
     * API | GET
     * Get a specific nominee.
     * @example {
     *   nomineeId: String
     * }
     * @param {*} req
     * @param {*} res
     */
    static async getNominee (req, res) {
        try {
            const nominee = await Nominee.findById(req.query.nomineeId)
            return new Response(res, { nominee }, 'Nominee found.', true)
        } catch (error) {
            ErrorHandler.sendError(res, error)
        }
    }

    /**
     * API | POST
     * Add a nominee.
     * @example {
     *   firstName: String,
     *   lastName: String
     * }
     * @param {*} req
     * @param {*} res
     */
    static async addNominee (req, res) {
        try {
            let nominee = new Nominee({ firstName: req.body.firstName, lastName: req.body.lastName })
            nominee = await nominee.save()
            return new Response(res, { nominee }, `Nominee addition ${nominee ? 'successful' : 'Unsuccessful'}.`, !!nominee, nominee ? 200 : 400)
        } catch (error) {
            ErrorHandler.sendError(res, error)
        }
    }

    /**
     * API | PUT
     * Add a nominee.
     * @example {
     *   nomineeId: String,
     *   firstName: String,
     *   lastName: String
     * }
     * @param {*} req
     * @param {*} res
     */
    static async updateNominee (req, res) {
        try {
            const updateNominee = await Nominee.findByIdAndUpdate({ _id: req.body.nomineeId }, {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                }
            })
            return new Response(res, { }, `Nominee update ${updateNominee ? 'successful' : 'Unsuccessful'}.`, !!updateNominee, updateNominee ? 200 : 400)
        } catch (error) {
            ErrorHandler.sendError(res, error)
        }
    }

    /**
     * API | DELETE
     * Delete a nominee.
     * @example {
     *   nomineeId: String
     * }
     * @param {*} req
     * @param {*} res
     */
    static async deleteNominee (req, res) {
        try {
            await Vote.deleteMany({ nomineeId: req.query.nomineeId })
            const updateNominee = await Nominee.findByIdAndRemove(req.query.nomineeId)
            return new Response(res, { }, `Nominee delete ${updateNominee ? 'successful' : 'Unsuccessful'}.`, !!updateNominee, updateNominee ? 200 : 400)
        } catch (error) {
            ErrorHandler.sendError(res, error)
        }
    }
}
module.exports = { NomineeController }
