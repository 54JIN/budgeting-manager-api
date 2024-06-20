const request = require('supertest')
const app = require('../src/app')
const Expense = require('../src/models/expense')
const { 
    userOneId, 
    userOne, 
    userTwoId,
    userTwo,
    expenseOne,
    expenseTwo,
    expenseThree,
    expenseFour,
    setupDatabase 
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create expense for user', async () => {
    const response = await request(app)
        .post('/expenses')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            spending : "400",
            category : "Car",
            date : "06/14/2024",
            notes : "Testing"
        })
        .expect(201)

    const expense = await Expense.findById(response.body._id)
    expect(expense).not.toBeNull()
})

test('Should fetch user expense', async () => {
    const response = await request(app)
        .get('/expenses')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toEqual(3)
})

test('Should not delete other users expense', async () => {
    const response = await request(app)
        .delete(`/expenses/${expenseTwo._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const expense = await Expense.findById(expenseOne._id)
    expect(expense).not.toBeNull()
})

test('Should fetch user expense by month' , async () => {
    const response = await request(app)
        .get('/expenses?month=05&year=2024')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toEqual(1)
})