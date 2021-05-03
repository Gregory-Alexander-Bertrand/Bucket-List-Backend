const models = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userController = {}

userController.create = async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        let user = await models.user.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        const encryptedId = jwt.sign({userId: user.id}, process.env.JWT_SECRET)
        console.log(encryptedId)
        res.json({message: 'success', userId: encryptedId, user})
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}

userController.login = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: {email: req.body.email}
        })
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const encryptedId = jwt.sign({userId: user.id}, process.env.JWT_SECRET)
            res.json({ message: 'welcome', userId: encryptedId, user})
        } else {
            res.status(401).json({message: 'attempt failed'})
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}



userController.verify = async (req, res) => {
    try {
        const decryptedId = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const user = await models.user.findOne({
            where:{id: decryptedId.userId},
            include:{model: models.goal}
        })
        console.log(user);
        if(user){res.json({user,message:'user found'})}
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }
}


module.exports = userController