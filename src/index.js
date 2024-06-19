const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const incomeRouter = require('./routers/income')
const expenseRouter = require('./routers/expense')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(incomeRouter)
app.use(expenseRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})