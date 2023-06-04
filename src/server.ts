// Imports
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'

// Handling Uncaught Exception Errors
process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

// Server
let server: Server

// Database connection
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Database connection successful`)

    // App listening
    server = app.listen(config.port, () => {
      logger.info(`Server is listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error(`Failed to connect database`, error)
  }

  // Gracefully closing the server
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
// Calling the function
bootstrap()

// Handling signal for termination
process.on('SIGTERM', () => {
  logger.info('SIGTERM received')
  if (server) {
    server.close()
  }
})
