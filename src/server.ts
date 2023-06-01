// Imports
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorLogger } from './shared/logger'

// Database connection
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Database connection successful`)

    // App listening
    app.listen(config.port, () => {
      logger.info(`Server is listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error(`Failed to connect database`, err)
  }
}
// Calling the function
bootstrap()
