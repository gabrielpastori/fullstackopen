const mongoose = require('mongoose')

const argvLength = process.argv.length

if (argvLength < 3) {
  console.log('at least db password should be provided')
  process.exit(1)
}


const password = process.argv[2]


const url = `mongodb+srv://gabriel:${password}@cluster0.qpesdsv.mongodb.net/phoneApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (argvLength === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

if (argvLength === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })

}
