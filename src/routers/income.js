const express = require('express')
const Income = require('../models/income')
const router = new express.Router()

router.post('/incomes', async (req, res) => {
    const income = new Income(req.body)

    try {
        await income.save()
        res.status(201).send(income)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/incomes', async (req, res) => {
    try {
        const incomes = await Income.find({})
        res.send(incomes)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/incomes/:id', async (req,res) => {
    const _id = req.params.id
    
    try {
        const income = await Income.findById(_id)

        if(!income) {
            return res.status(404).send()
        }

        res.send(income)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/incomes/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['wage', 'other']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const income = await Income.findById(req.params.id)

        updates.forEach((update) => income[update] = req.body[update])

        await income.save()

        //const income = await Income.findByIdAndUpdate(req.params.id, req.body, { new: true, validators: true} )

        if(!income) {
            return res.status(404).send()
        }

        res.send(income)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/incomes/:id', async (req,res) => {
    try {
        const income = await Income.findByIdAndDelete(req.params.id)

        if(!income) {
            return res.status(404).send()
        }

        res.send(income)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router