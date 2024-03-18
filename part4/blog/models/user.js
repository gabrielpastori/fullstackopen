const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        validate: {
            validator: function(v) {
                return v.length >= 3
            },
            message: 'username must be at least 3 chars'
        },
        required: [true, 'Name']
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.passwordHash
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('User', userSchema)