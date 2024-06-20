const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        firstName: 'Andrew',
        lastName: 'Mead',
        email: 'andrew@example.com',
        password: 'Rework123'
    }).expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            firstName: 'Andrew',
            email: 'andrew@example.com'
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('Rework123')
})

test('Should not signup user with invalid firstName' , async () => {
    await request(app)
        .post('/users')
        .send({
            firstName: "",
            lastName: "timothy" ,
            email: "blanktimothy@example.com",
            password: "Remember123"
        })
        .expect(400)
})

test('Should not signup user with invalid lastName' , async () => {
    await request(app)
        .post('/users')
        .send({
            firstName: "timothy",
            lastName: "" ,
            email: "blanktimothy@example.com",
            password: "Remember123"
        })
        .expect(400)
})

test('Should not signup user with invalid email' , async () => {
    //Empty Email
    await request(app)
        .post('/users')
        .send({
            firstName: "timothy",
            lastName: "blank" ,
            email: "",
            password: "Remember123"
        })
        .expect(400)
    
    //Improper Email    
    await request(app)
        .post('/users')
        .send({
            firstName: "timothy",
            lastName: "blank" ,
            email: "isfhs@.com",
            password: "Remember123"
        })
        .expect(400)
})

test('Should not signup user with invalid password' , async () => {
    //Empty Password
    await request(app)
        .post('/users')
        .send({
            firstName: "timothy",
            lastName: "blank" ,
            email: "blanktimothy@example.com",
            password: ""
        })
        .expect(400)
    
    //Less than minimum length 7 password
    await request(app)
        .post('/users')
        .send({
            firstName: "timothy",
            lastName: "blank" ,
            email: "blanktimothy@example.com",
            password: "qwert1"
        })
        .expect(400)
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'thisisnotmypass'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            firstName: 'Bess'
        })
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.firstName).toEqual('Bess')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Philadelphia'
        })
        .expect(400)
})

test('Should not update user if unauthenticated', async () => {
    await request(app)
        .patch('/users/me')
        .send({
            firstName: 'Bess'
        })
        .expect(401)
})

test('Should not update user with invalid firstName', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            firstName: ''
        })
        .expect(400)
})

test('Should not update user with invalid lastName', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            lastName: ''
        })
        .expect(400)
})

test('Should not update user with invalid email', async () => {
    //Empty Email
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            email: ''
        })
        .expect(400)
    
    //Improper Email
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            email: 'fgasef@.com'
        })
        .expect(400)
})

test('Should not update user with invalid password', async () => {
    //Empty password
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            password: ''
        })
        .expect(400)
    
    //Less than minimum length 7 password
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            password: 'qwert1'
        })
        .expect(400)
})