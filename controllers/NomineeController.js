'use strict'

const { Nominee } = require('./../schema/nominee')
const { Response } = require('./../utils/Response')
const { ErrorHandler } = require('./../utils/ErrorHandler')

class NomineeController {
    /**
     * API | GET
     * Get all nominees.
     * @example { }
     * @param {*} req
     * @param {*} res
     */
    static async getNominees (req, res) {
        try {
            const nominees = await Nominee.find({})
            return new Response(res, { nominees }, 'Nominees found.', true)
        } catch (error) {
            ErrorHandler.sendError(res, error)
        }
    }
}
module.exports = { NomineeController }
