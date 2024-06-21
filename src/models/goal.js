const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        lowercase: true
    },
    financialGoal : {
        type: Number,
        requried: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Goal = mongoose.model('Goal', goalSchema)

module.exports = Goal