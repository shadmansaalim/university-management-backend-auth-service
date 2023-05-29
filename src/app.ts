// Imports
import express, { Application, Request, Response } from 'express'
import cors from 'cors'

// Application Routes
import userRoutes from './app/modules/user/user.route'

// Express App
const app: Application = express()

// Using cors
app.use(cors())

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', userRoutes)

// Hello World GET API for TESTING
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
