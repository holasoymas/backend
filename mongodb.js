const mongoose = require('mongoose')

const password = process.argv[2];
const url = `mongodb+srv://holasoymas:${password}@cluster0.xlbju8f.mongodb.net/noteApp?retryWrites=true&w=majority`


mongoose.connect(url)

mongoose.set('strictQuery', false)

const person = mongoose.Schema({
  name: String,
  number: Number,
})

person.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
})

const Person = new mongoose.model('Person', person)


// mongoose.connect(url).then(res => {
// console.log(`connected`);
// if (process.argv.length === 5) {
//   const newPerson = new Person({
//     name: process.argv[3],
//     number: process.argv[4],
//   })
//   return newPerson.save().then(res => {
//     console.log(`data created`);
//     mongoose.connection.close()
//   }).catch(err => console.log(`couldnt save data`))
// } else {
//   Person.find({}).then(res => {
//     return res.forEach(element => {
//       console.log(element);
//       mongoose.connection.close()
//     });
//   }).catch(err => {
//     console.log(`couldnt show data : ${err}`)
//   })
// }

// }).catch(err => {
//   console.log(`Err is : ${err}`);
// })

module.exports = Person

