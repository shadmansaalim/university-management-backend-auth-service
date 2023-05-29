// Imports
import express, { Application, Request, Response } from 'express'
import cors from 'cors'

// Express App
const app: Application = express()

// Using cors
app.use(cors())

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Hello World GET API for TESTING
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
