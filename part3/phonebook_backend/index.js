require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
morgan.token('body', function(req, res) {
    if (req.method !== 'POST') return ''
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
    })

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.post('/api/persons/', (request, response) => {
    const body = request.body
    const newPersonName = body.name
    let errorMessage = null
    let errorStatus = null
    if (!body.number) {
        errorMessage = 'number must be specified'
        errorStatus = 400
    }
    if (!body.name) {
        errorMessage = 'name must be specified'
        errorStatus = 400
    }

    if (errorMessage) {
        return response.status(errorStatus).send({
            error: errorMessage
        })
    }

    const newPerson = new Person({
        "name": body.name,
        "number": body.number,
    })
    newPerson.save().then(savedPerson => {
        response.json(savedPerson)
    })
    
})

app.get('/info', (request, response) => {
    const personsCount = persons.length
    const currrentDate = Date()
    response.send(
        `
        <p>Phonebook has info for ${personsCount} people</p>
        <p>${currrentDate}</p>
        `
    )
})

const errorHandler = (error, request, response, next) => {
    console.log(error.message)
    
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})