const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/budgeting-manager-api', {
    useNewUrlParser: true,
    // useCreateIndex: true
})