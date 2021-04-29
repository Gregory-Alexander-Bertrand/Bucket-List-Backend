const models = require('../models')

const userController = {}

userController.create = async (req, res) => {
    try {
        let user = await models.user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json({user})
    } catch (error) {
        res.json({error})
    }
}

userController.login = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: {email: req.body.email}
        })
        if (user.password === req.body.password) {
            res.json({user, message: 'welcome'})
        } else {
            res.status(401).json({message: 'attempt failed'})
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}

module.exports = userController