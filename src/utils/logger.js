const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Ensure logs directory exists
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Custom log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    if (stack) {
      return `${timestamp} [${level}]: ${message}\nStack: ${stack}`;
    }
    return `${timestamp} [${level}]: ${message}`;
  })
);

// Console transport with color
const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    logFormat
  )
});

// File transports
const fileTransports = [
  // Combined log file
  new winston.transports.File({
    filename: path.join(logDir, 'combined.log'),
    format: logFormat
  }),
  // Error log file
  new winston.transports.File({
    filename: path.join(logDir, 'error.log'),
    level: 'error',
    format: logFormat
  })
];

// Create logger based on environment
const createLogger = (env) => {
  const transports = [consoleTransport];

  // Add file transports only in production
  if (env === 'production') {
    transports.push(...fileTransports);
  }

  return winston.createLogger({
    level: env === 'production' ? 'info' : 'debug',
    format: logFormat,
    transports: transports,
    exitOnError: false
  });
};

// Export logger configured for current environment
module.exports = createLogger(process.env.NODE_ENV || 'development');