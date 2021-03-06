require('dotenv').config()
const express = require('express')
const app = express()

app.use(require('morgan')('tiny'))
const routesReport = require('rowdy-logger').begin(app)

app.use(express.json())
app.use(require('cors')())

const userRoutes = require('./routes/userRoutes')
const goalRoutes = require('./routes/goalRoutes')
app.use('/user', userRoutes)
app.use('/goal', goalRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
  routesReport.print()
})