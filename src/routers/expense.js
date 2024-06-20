const express = require('express')
const Expense = require('../models/expense')
const auth = require('../middleware/auth')
const router = new express.Router()


//Create Expense
router.post('/expenses', auth, async (req, res) => {
    const expense = new Expense({
        ...req.body,
        owner: req.user._id
    })
    
    try {
        await expense.save()
        res.status(201).send(expense)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Read Expenses
router.get('/expenses', auth, async (req, res) =>  {
    const match = {}
    const sort = {}

    //Sort By Create Date
    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    //Filter By Month and Year
    if (req.query.month && req.query.year) {
        const month = parseInt(req.query.month) - 1
        const year = parseInt(req.query.year)

        const startDate = new Date(year, month, 1)
        const endDate = new Date(year, month + 1, 1)

        match.date = {
            $gte: startDate,
            $lt: endDate
        }
    }

    try {
        await req.user.populate({
            path: 'expenses',
            match,
            options: {
                limit: parseInt(req.query.limit) || null,
                skip: parseInt(req.query.skip) || null,
                sort
            }
        })
        res.send(req.user.expenses)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Read Specific Expense
router.get('/expenses/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const expense = await Expense.findOne({ _id, owner: req.user._id })

        if(!expense) {
            res.status(404).send()
        }

        res.send(expense)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Update Specific Expense
router.patch('/expenses/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['spending', 'category', 'date', 'notes']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const expense = await Expense.findOne({ _id: req.params.id, owner: req.user._id })

        if(!expense) {
            return res.status(404).send()
        }

        updates.forEach((update) => expense[update] = req.body[update])
        await expense.save()

        res.send(expense)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Delete Specific Expense
router.delete('/expenses/:id', auth, async(req, res) => {
    try {
        const expense = await Expense.findOneAndDelete({ _id: req.params.id, owner: req.user._id})

        if(!expense) {
            return res.status(404).send()
        }

        res.send(expense)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router;