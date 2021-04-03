'use strict'

const { mongoose } = require('./mongoose')

let nomineeSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

let Nominee = mongoose.model('Nominee', nomineeSchema)
module.exports = { Nominee }
