const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('please provide password as an argument : node mongo.js <password>')
  process.exit(1)
}

mongoose.set('strictQuery', false)

const password = process.argv[2];

const url = `mongodb+srv://holasoymas:${password}@cluster0.xlbju8f.mongodb.net/noteApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema);

mongoose.connect(url)
  .then(res => {
    console.log('connected')

    const note = new Note({
      content: 'It is false',
      date: new Date(),
      important: false
    })
    return note.save().then(() => {
      console.log('note saved')
      mongoose.connection.close()
    })
  }).catch(err => console.log(err))
// .then(() => {
//   console.log('note saved')
//   return mongoose.connection.close()
// }).catch(err => console.log(err))

Note.find({ important: false }).then(result => {
  // result.forEach(note => {
  // console.log(note)
  console.log(result)
  // })
  mongoose.connection.close()
})

module.exports = Note;

