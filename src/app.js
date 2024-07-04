const express = require('express')
const path = require('path')
require('./db/mongoose')
const userRouter = require('./routers/user')
const incomeRouter = require('./routers/income')
const expenseRouter = require('./routers/expense')
const financialGoalRouter = require('./routers/goal')

const app = express()

const reactBuild = path.join(__dirname, '..', 'budgeting-manager-front', 'build')

app.use(express.static(reactBuild))
app.use(express.json())
app.use(userRouter)
app.use(incomeRouter)
app.use(expenseRouter)
app.use(financialGoalRouter)

app.get('/api', async(req,res) => {
    res.send({message: 'Hello'})
})

app.get('*', async(req,res) => {
    res.sendFile(path.join(reactBuild, 'index.html'))
})

module.exports = app