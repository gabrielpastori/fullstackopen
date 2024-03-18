const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

test('User creation with invalid username fails', async () => {
    const newUser = {
        username: 'gb',
        name: 'gabriel',
        password: '12345',
    }
    const response = await api.post('/api/users')
                            .send(newUser)
                            .expect(400)  
    const error_message = response.body.error
    
    assert(error_message.includes('validation'))
})

test('User creation with invalid password fails', async () => {
    const newUser = {
        username: 'gpastori',
        name: 'gabriel',
        password: '12',
    }
    const response = await api.post('/api/users')
                            .send(newUser)
                            .expect(400)  
    const error_message = response.body.error
    
    assert(error_message.includes('validation'))
})
after(async() => {
    await mongoose.connection.close()
})