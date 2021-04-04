'use strict'

const { mongoose } = require('./mongoose')

const voteSchema = new mongoose.Schema(
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

const Vote = mongoose.model('Vote', voteSchema)
module.exports = { Vote }
