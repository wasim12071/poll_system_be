'use strict'

const { mongoose } = require('./mongoose')

let voteSchema = new mongoose.Schema(
    {
        nomineeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Nominee',
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

voteSchema.index({ email: 1 }, { unique: true })

let Vote = mongoose.model('Vote', voteSchema)
module.exports = { Vote }
