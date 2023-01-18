const mongoose = require('mongoose')

// const url = process.env.MONGO
const url = "mongodb+srv://holasoymas:holasoymas123@cluster0.xlbju8f.mongodb.net/noteApp?retryWrites=true&w=majority"

mongoose.set('strictQuery', false)

mongoose.connect(url).then(() => {
  console.log('databsee connected');
}).catch(err => console.log(`Error is ${err}`))

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 10,
  },
  number: {
    type: Number,
    required: true,
    minLength: 6,
    maxLength: 10,
  }
})

userSchema.set('toJSON', {  //NOTE: toJSON method transform into string 
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Person', userSchema)
// const person = new Person({
//   name: "This is man",
//   number: 48535,
// })

// person.save().then(res => {
//   console.log(typeof res)
//   mongoose.connection.close()
// })

// Person.find().then(res => {
//   res.forEach(p => {
//     console.log(p)
//   })
//   mongoose.connection.close()
// })
