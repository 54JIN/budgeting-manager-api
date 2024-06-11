const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const incomeRouter = require('./routers/income')

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(userRouter)
app.use(incomeRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})