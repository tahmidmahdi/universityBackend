import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './middlewares/globalErrorHandler'
import notFound from './middlewares/notFound'
import router from './routes'

// initialize express
const app: Application = express()

// basic usages
app.use(express.json())
app.use(cors())

app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(globalErrorHandler)

// not found route
app.use(notFound)

export default app
