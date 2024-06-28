import cors from 'cors'
import express from 'express'

// initialize express
const app = express()

// basic usages
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app
