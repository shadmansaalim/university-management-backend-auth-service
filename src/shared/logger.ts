// Imports
import path from 'path'
import { createLogger, format, transports } from 'winston'

// Destructuring
const { combine, timestamp, label, printf, prettyPrint } = format

// Custom Log Format
const customLogFormat = printf(({ level, message, label, timestamp }: any) => {
  // Modifying timestamp to display log in a readable format
  const date = new Date(timestamp)

  const hour = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`
})

// Success Logger
const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'UM' }),
    timestamp(),
    customLogFormat,
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
      level: 'info',
    }),
  ],
})

// Error Logger
const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'UM' }),
    timestamp(),
    customLogFormat,
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
      level: 'error',
    }),
  ],
})

export { logger, errorLogger }
