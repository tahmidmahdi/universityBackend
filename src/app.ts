import cors from 'cors'
import express, { Application, Request, Response } from 'express'

// initialize express
const app: Application = express()

// basic usages
app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
