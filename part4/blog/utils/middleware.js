const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.body)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json( { error: error.message } )
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(400).json( {error: 'token missing or invalid' })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request['token'] = authorization.replace('Bearer ', '')
  } else {
    request['token'] = null;
  }
  next()
}

const userExtractor = (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    request['user'] = decodedToken
  }
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}