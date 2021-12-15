import express from 'express'
import socket from 'socket.io'

const port = 3001

const app = express()
const server = app.listen(port)

const io = socket(server)

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the API',
  })
})

io.on('connection', () => {
  console.log('Se conecto un usuario')
})
