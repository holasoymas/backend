const { default: mongoose } = require("mongoose");

const url = process.env.MONGO_URL

console.log(`connecting to the database ${url}`)
mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(res => {
    console.log(`database connected ${res}`)
  })
  .catch(err => {
    console.log(`Error while connecting to the database , ${err}`)
  })

const noteSchema = new mongoose.Schema({
  name: String,
  number: Number,
})


//NOTE: toJSON method automatically convert each object into json 
noteSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj
    delete returnedObj._id;
    delete returnedObj.__v;
  }
})
// const Person = mongoose.model('Person', noteSchema)
// module.exports = Person
module.exports = mongoose.model('Person', noteSchema)
