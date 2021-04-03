'use strict'

const { Response } = require('./Response')

class ErrorHandler {
    /**
     * Error handling.
     * @param {*} res 
     * @param {*} error 
     * @returns Response
     */
    static sendError (res, error) {
        try {

            // Print the error in server console to add it in logs (Assuming using forever npm package for hosting)
            console.log(error)
            if (typeof error === 'string') {

                // If its a handled unauthorised error thrown from any funtion.
                return new Response(res, { }, error || 'Unauthoriesed access.', false, 401)
            } else if (error.code <= 500 && error.code >= 300) {

                // Unhandled erros and requests.
                return new Response(res, error, JSON.stringify(error), false, error.code)
            } else {

                // Rest of the errors.
                return new Response(res, error, JSON.stringify(error), false, 400)
            }
        } catch (error) {

            // If error handler fails.
            return new Response(res, { success: false }, 'Something went wrong', false, 500)
        }
    }
}

module.exports = { ErrorHandler }
