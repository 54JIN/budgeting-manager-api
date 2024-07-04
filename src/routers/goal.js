const express = require('express')
const Goal = require('../models/goal')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/api/financialGoals', auth, async (req, res) => {
    const goal = new Goal({
        ...req.body,
        owner: req.user._id
    })

    try {
        await goal.save()
        res.status(201).send(goal)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/api/financialGoals', auth, async (req, res) => {
    try {
        await req.user.populate({
            path: 'goals',
        })
        res.send(req.user.goals)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/api/financialGoals/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['category', 'financialGoal']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if(!isValidOperation) {
        res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const goal = await Goal.findOne({ _id: req.params.id, owner: req.user._id })

        if(!goal){
            return res.status(404).send()
        }

        updates.forEach((update) => goal[update] = req.body[update])
        await goal.save()

        res.send(goal)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/api/financialGoals/:id', auth, async (req, res) => {
    try {
        const goal = await Goal.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if(!goal) {
            return res.status(404).send()
        }

        res.send(goal)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router