const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const incomeRouter = require('./routers/income')
const expenseRouter = require('./routers/expense')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(incomeRouter)
app.use(expenseRouter)

module.exports = app