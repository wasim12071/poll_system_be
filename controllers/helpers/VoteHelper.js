'use strict'

const { Nominee } = require('./../../schema/nominee')

class VoteHelper {
    /**
     * Get the voting count stats.
     */
    static async getVoteStats () {
        return await Nominee.aggregate([
            {
                $lookup: {
                    from: 'votes',
                    localField: '_id',
                    foreignField: 'nomineeId',
                    as: 'votes'
                }
            },
            {
                $project: {
                    _id: '$_id',
                    firstName: '$firstName',
                    lastName: '$lastName',
                    count: { $size: '$votes' }
                }
            }
        ])
    }
}
module.exports = { VoteHelper }
