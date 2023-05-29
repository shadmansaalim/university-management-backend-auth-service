// Imports
import mongoose from 'mongoose'
import app from './app'
import config from './config'

// Database connection
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log(`Database connection successful`)

    // App listening
    app.listen(config.port, () => {
      console.log(`Server is listening on port ${config.port}`)
    })
  } catch (err) {
    console.log(`Failed to connect database`, err)
  }
}
// Calling the function
bootstrap()
