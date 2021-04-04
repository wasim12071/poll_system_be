'use strict'

const { mongoose } = require('./mongoose')

const nomineeSchema = new mongoose.Schema(
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

const Nominee = mongoose.model('Nominee', nomineeSchema)
module.exports = { Nominee }
