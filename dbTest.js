const models = require('./models')

const testAssociation = async () => {
    const userReport = await models.user.findOrCreate({
        where: { name: 'Mary'}
    })

    const user = await userReport[0]

    const goalReport = await models.goal.findOrCreate({
        where: { name: 'Become a good developer'}
    })

    const goal = await goalReport[0]

    await user.addGoal(goal)

    const userGoal = await user.getGoal()
    console.log(userGoal)
    res.json({userGoal})
}

testAssociation()