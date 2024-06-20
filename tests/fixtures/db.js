const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Income = require('../../src/models/income')
const Expense = require('../../src/models/expense')

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
    date : "05/15/2024",
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
    wage : 700,
    category : "TikTok",
    date : "06/16/2024",
    notes : "Testing Twitch",
    owner: userOne._id
}

const incomeFour = {
    _id: new mongoose.Types.ObjectId(),
    wage : 300,
    category : "Kick",
    date : "06/18/2024",
    notes : "Testing Kick",
    owner: userTwo._id
}

const expenseOne = {
    _id: new mongoose.Types.ObjectId(),
    spending : 1500,
    category : "YouTube",
    date : "05/15/2024",
    notes : "Testing YouTube",
    owner: userOne._id
}

const expenseTwo = {
    _id: new mongoose.Types.ObjectId(),
    spending : 700,
    category : "Twitch",
    date : "06/16/2024",
    notes : "Testing Twitch",
    owner: userOne._id
}

const expenseThree = {
    _id: new mongoose.Types.ObjectId(),
    spending : 400,
    category : "TikTok",
    date : "06/18/2024",
    notes : "Testing Kick",
    owner: userOne._id
}

const expenseFour = {
    _id: new mongoose.Types.ObjectId(),
    spending : 300,
    category : "Kick",
    date : "06/18/2024",
    notes : "Testing Kick",
    owner: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Income.deleteMany()
    await Expense.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Income(incomeOne).save()
    await new Income(incomeTwo).save()
    await new Income(incomeThree).save()
    await new Income(incomeFour).save()
    await new Expense(expenseOne).save()
    await new Expense(expenseTwo).save()
    await new Expense(expenseThree).save()
    await new Expense(expenseFour).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    incomeOne,
    incomeTwo,
    incomeThree,
    incomeFour,
    expenseOne,
    expenseTwo,
    expenseThree,
    expenseFour,
    setupDatabase
}