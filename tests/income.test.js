const request = require('supertest')
const app = require('../src/app')
const Income = require('../src/models/income')
const { 
    userOneId, 
    userOne, 
    userTwoId,
    userTwo,
    incomeOne,
    incomeTwo,
    incomeThree,
    incomeFour,
    setupDatabase 
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create income for user', async () => {
    const response = await request(app)
        .post('/incomes')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            wage : 1500,
            category : "Youtube",
            date : "06/14/2024",
            notes : "Testing"
        })
        .expect(201)
    const income = await Income.findById(response.body._id)
    expect(income).not.toBeNull()
})

test('Should fetch user income', async () => {
    const response = await request(app)
        .get('/incomes')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toEqual(3)
})

test('Should not delete other users income', async () => {
    const response = await request(app)
        .delete(`/tasks/${incomeOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const income = await Income.findById(incomeOne._id)
    expect(income).not.toBeNull()
})

test('Should fetch user income by month' , async () => {
    const response = await request(app)
        .get('/incomes?month=05&year=2024')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toEqual(1)
})