'use strict'

const { User } = require('../../schema/user')
const { Response } = require('../../utils/Response')
const { ErrorHandler } = require('../../utils/ErrorHandler')
const bcrypt = require('bcryptjs')

class UserController {
    /**
     * API | GET
     * Get authenticated user profile.
     * @example { }
     * @param {*} req
     * @param {*} res
     */
    static async getProfile (req, res) {
        try {
            const user = await User.findOne({ _id: req.user._id })
            return new Response(res, { user }, "User Profile found!", true)
        } catch (error) {
            ErrorHandler.sendError(res, error)
        }
    }

    /**
     * API | PUT
     * Update authenticated user profile.
     * @example {
     *      firstName: String,
     *      lastName: String,
     * }
     * @param {*} req
     * @param {*} res
     */
    static async updateProfile (req, res) {
        try {
            const updateProfile = await User.findByIdAndUpdate({ _id: req.user._id }, {
                $set: {
                    firstName: req.body.firstName || req.user.firstName,
                    lastName: req.body.lastName || req.user.lastName
                }
            })
            return new Response(res, { }, `User profile update ${updateProfile ? "successful" : "Unsuccessful"}.`, updateProfile ? true : false, updateProfile ? 200 : 400 )
        } catch (error) {
            ErrorHandler.sendError(res, error)
        }
    }

    /**
     * API | PUT
     * Update authenticated user password.
     * @example {
     *      password: String
     * }
     * @param {*} req
     * @param {*} res
     */
    static async updatePassword (req, res) {
        try {
            const updateProfile = await User.findByIdAndUpdate({ _id: req.user._id }, {
                $set: {
                    password: bcrypt.hashSync(req.body.password, 8)
                }
            })
            return new Response(res, { }, `User password update ${updateProfile ? "successful" : "Unsuccessful"}.`, updateProfile ? true : false, updateProfile ? 200 : 400 )
        } catch (error) {
            ErrorHandler.sendError(res, error)
        }
    }
}
module.exports = { UserController }