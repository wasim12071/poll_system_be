'use strict'

const { User } = require('./../schema/user')
const { Response } = require('./../utils/Response')
const { ErrorHandler } = require('./../utils/ErrorHandler')
const { AuthMiddleware } = require('./../middleware/AuthMiddleware')
const bcrypt = require('bcryptjs')

class AuthenticationController {
    /**
     * API | POST
     * Login the registered user and send authentication token.
     * @example {
     *      email: String,
     *      password: String
     * }
     * @param {*} req
     * @param {*} res
     */
    static async login (req, res) {
        try {
            // Check if the email is present
            const checkUser = await User.findOne({ email: req.body.email })
            if (checkUser) {
                // Check if the password is correct.
                if (bcrypt.compareSync(req.body.password, checkUser.password)) {
                    // Return the token.
                    return new Response(res, { token: AuthMiddleware.createJWT(checkUser) }, 'Login Successful', true)
                } else {
                    return new Response(res, { password: 'Invalid Password' }, 'Invalid email or password.', false, 200)
                }
            } else {
                return new Response(res, { email: 'Invalid Email' }, 'Invalid email or password.', false, 200)
            }
        } catch (error) {
            ErrorHandler.sendError(res, error)
        }
    }
}
module.exports = { AuthenticationController }
