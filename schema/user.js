'use strict'

const { mongoose } = require('./mongoose')

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

userSchema.index({ email: 1 }, { unique: true })

const User = mongoose.model('User', userSchema)
module.exports = { User }
