const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const incomeRouter = require('./routers/income')
const expenseRouter = require('./routers/expense')
const financialGoalRouter = require('./routers/goal')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(incomeRouter)
app.use(expenseRouter)
app.use(financialGoalRouter)

module.exports = app