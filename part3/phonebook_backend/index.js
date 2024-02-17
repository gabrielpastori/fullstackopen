express = require('express')
morgan = require('morgan')
cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
morgan.token('body', function(req, res) {
    if (req.method !== 'POST') return ''
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
    return parseInt(Math.random() * 1e8)
}

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const requestId = Number(request.params.id)
    const requestPerson = persons.filter(person => person.id === requestId)
    if (!requestPerson.length) {
        response.status(404).end()
        return
    }
    response.json(...requestPerson)
})

app.delete('/api/persons/:id', (request, response) => {
    const deleteId = Number(request.params.id)
    persons = persons.filter(person => person.id !== deleteId)
    response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
    const body = request.body
    const newPersonName = body.name
    const nameExists = persons.filter(person => person.name === newPersonName)
                              .length > 0
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
    if (nameExists) {
        errorMessage = 'name already saved! Specify a new one'
        errorStatus = 409
    }

    if (errorMessage) {
        return response.status(errorStatus).send({
            error: errorMessage
        })
    }

    const newPerson = {
        "name": body.name,
        "number": body.number,
        "id": generateId(),
    }
    persons.push(newPerson)

    response.json(newPerson)
    
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})