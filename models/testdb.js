require('dotenv').config()
const mongoose = require('mongoose')

// const url = process.env.MONGO
const url = "mongodb+srv://holasoymas:holasoymas123@cluster0.xlbju8f.mongodb.net/noteApp?retryWrites=true&w=majority"

mongoose.set('strictQuery', false)

mongoose.connect(url).then(() => {
  console.log('databsee connected');
}).catch(err => console.log(`Error is ${err}`))

const userSchema = mongoose.Schema({
  name: String,
  number: Number
})

const Person = mongoose.model('Person', userSchema)

// const person = new Person({
//   name: "This is man",
//   number: 48535,
// })

// person.save().then(res => {
//   console.log(typeof res)
//   mongoose.connection.close()
// })

Person.find().then(res => {
  res.forEach(p => {
    console.log(p)
  })
  mongoose.connection.close()
})
