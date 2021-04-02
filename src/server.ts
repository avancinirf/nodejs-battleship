import express, { response } from 'express'
import routes from './routes'
import socket from 'socket.io'
import http from 'http'
import SocketIO from 'socket.io'

const PORT = process.env.PORT || 3333
const app = express()
app.use(express.static(__dirname + '/../public'))

const httpServer = http.createServer(app)
const io = socket(httpServer, { path: '/socket.io' })
const clients: Array<any> = []

io.on('connection', (socket: SocketIO.Socket) => {
  console.log(`New Connection by ${socket.id}`)
  clients.push(socket)
  socket.on('disconnect', () => {
    clients.splice(clients.indexOf(socket), 1)
    console.log(`Disconnected - ${socket.id}`)
  })
})

app.use(express.json())

app.get('/msg', (req, res) => {
  const msg = req.query.msg || ''
  for (const client of clients) {
    client.emit('msg', msg)
  }
  res.json({ ok: true })
})

app.use(routes)

httpServer.listen(PORT, () => {
  console.log(`server started on port ${PORT}.`)
})
