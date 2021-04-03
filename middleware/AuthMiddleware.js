'use strict'

const { User } = require('./../schema/user')
const { ErrorHandler } = require('./../utils/ErrorHandler')

const moment = require('moment')
const jwt = require('jwt-simple')
const config = require('./../config')

class AuthMiddleware {

    /**
     * Create JWT token with 1 Year expiry.
     * @param {*} user 
     * @returns String
     */
    static createJWT (user) {
        return jwt.encode({
            uid: user._id,
            iat: moment().unix(),
            exp: moment().add(365, 'days').unix()
        }, config.TOKEN_SECRET)
    }

    /**
     * Decode JWT.
     * @param {*} token
     * @returns {*} { uid, iat, exp }
     */
    static decodeJWT (token) {
        return jwt.decode(token, config.TOKEN_SECRET)
    }

    /**
     * Check if the user is authenticated.
     * @param {*} req Request
     * @param {*} res Response
     * @param {*} next Next
     */
    static async isAuthorized (req, res, next) {
        try {

            // Check if the token is attached in the header
            if (req.header('token')) {
                
                // Check if the user is present.
                const user = await User.findOne({ _id: AuthMiddleware.decodeJWT(req.header('token')).uid })
                if (user) {

                    // Attach the user object to the request.
                    req.user = user;
                    next()
                } else {

                    // If the user session is expired.
                    throw('Whops! Your session has expired. Please login again.')
                }
            } else {

                // If the token is not attached, meaning user is not logged in.
                throw('You need to login, to perform this action.')
            }
        } catch (error) {
            ErrorHandler.sendError(res, error)
        }
    }
}

module.exports = { AuthMiddleware }
