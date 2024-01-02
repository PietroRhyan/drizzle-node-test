import express from 'express'
import cors from 'cors'
import http from 'http'
import cookieParser from 'cookie-parser'
import router from './routes/routes'

const app = express()

const port = 3333

app.use(cors({ credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/', router)

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server is listening on https://localhost:${port}`)
})
