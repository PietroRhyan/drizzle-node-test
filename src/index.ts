import express from 'express'
import cors from 'cors'

const app = express()

const port = 3333

app.use(express.json())
app.use(cors())



app.listen(3333,  () => console.log(`Server is listening on https://localhost:${port}`))