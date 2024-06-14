const mongoose = require('mongoose')
const validator = require('validator')

const Income = mongoose.model('Income', {
    wage: {
        type: Number,
        validate(val) {
            if(val < 0) {
                throw new Error('Wage cannot be negative')
            }
        }
    },
    other: {
        type: Number,
        validate(val) {
            if(val < 0) {
                throw new Error('Income cannot be negative')
            }
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Income