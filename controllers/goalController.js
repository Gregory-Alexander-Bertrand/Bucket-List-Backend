const models = require('../models')
const jwt = require('jsonwebtoken')
const goalController = {}

goalController.create= async (req, res) => {
    try {
        let goal = await models.goal.create({
            name: req.body.name,
            location: req.body.location,
            date: req.body.date,
            description: req.body.description
        })
        
        let user = await models.user.findOne({
            where: {
                id: req.headers.authorization
            }
        })
        await user.addGoal(goal)
        await goal.reload()
        res.json({message: 'goal created'})
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}

goalController.getAll = async (req, res) => {
    try {
        let goals = await models.goal.findAll()
        res.json({goals})
    } catch (error) {
        res.json({error})
    }
}

goalController.find = async (req, res) => {
    try {
        let goal = await models.goal.findOne({
            where: {
                id: req.params.id
            }
        })
        res.json({goal})
    } catch (error) {
        res.json({error})
    }
}

goalController.delete = async (req, res) => {
    try {
        let finishedGoal = await models.goal.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({finishedGoal})
    } catch (error) {
        res.json({error})
    }
}

goalController.update = async (req, res) => {
    try {
        let updates = req.body
        let updatedGoal = await models.goal.findOne({
            where: {
                id: req.params.id
            }
        })
        let resultedGoal = await updatedGoal.update(updates)
        res.json({final})
    } catch (error) {
        res.json({error})
    }
}

module.exports = goalController