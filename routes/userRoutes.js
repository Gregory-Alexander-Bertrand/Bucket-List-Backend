const userController = require('../controllers/userController')
const express = require('express')
const userRoutes = require('express').Router()

userRoutes.post('/', userController.create)
userRoutes.post('/login', userController.login)
userRoutes.get('/verify', userController.verify)

module.exports = userRoutes