const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Income = require('../../src/models/income')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    firstName: 'Mike',
    lastName: 'Sanchez',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    firstName: 'Andrew',
    lastName: 'Rick',
    email: 'andrew2@example.com',
    password: 'myhouse099@@',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const incomeOne = {
    _id: new mongoose.Types.ObjectId(),
    wage : 1500,
    category : "YouTube",
    date : "06/15/2024",
    notes : "Testing YouTube",
    owner: userOne._id
}

const incomeTwo = {
    _id: new mongoose.Types.ObjectId(),
    wage : 700,
    category : "Twitch",
    date : "06/16/2024",
    notes : "Testing Twitch",
    owner: userOne._id
}

const incomeThree = {
    _id: new mongoose.Types.ObjectId(),
    wage : 300,
    category : "Kick",
    date : "06/18/2024",
    notes : "Testing Kick",
    owner: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Income.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Income(incomeOne).save()
    await new Income(incomeTwo).save()
    await new Income(incomeThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    incomeOne,
    incomeTwo,
    incomeThree,
    setupDatabase
}