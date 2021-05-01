const goalController = require('../controllers/goalController')
const express = require('express')
const goalRoutes = require('express').Router()

goalRoutes.post('/', goalController.create)
goalRoutes.get('/', goalController.getAll)
goalRoutes.get('/:id', goalController.find)
goalRoutes.delete('/:id', goalController.delete)
goalRoutes.put('/:id', goalController.update)

module.exports = goalRoutes