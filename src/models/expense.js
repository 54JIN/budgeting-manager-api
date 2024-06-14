const mongoose = require('mongoose')

const Expense = mongoose.model('Expense', {
    spending: {
        type: Number,
        required: true,
        validate(val) {
            if(val === 0) {
                throw new Error("Expense cannot be $0.00")
            } else if(val < 0) {
                throw new Error('Expense cannot be negative')
            }
        }
    },
    category: { 
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    notes: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Expense