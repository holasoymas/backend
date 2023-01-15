const express = require('express')
const app = express()
const data = require('./data')
const cors = require('cors')
const phonedata = require('./phonedata')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 8000

let notes = data.notes;
let persons = phonedata.persons

// app.get("/", (req, res) => {
//   res.send('<h1>This is backend. nothing is in here use "/api/notes" to see data </h1>')
// })

app.get("/api/notes", (req, res) => {
  res.json(notes)
})

app.get("/api/persons", (req, res) => {
  res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const find = persons.find(person => person.id === id);

  if (!find) {
    res.status(404).send('<h2>Data out of limit</h2>')
  } else {
    res.json(find)
  }
})

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const find = notes.find(note => note.id === id);

  if (!find) {
    res.status(404).send('<h2>Data out of limit</h2>')
  } else {
    res.json(find)
  }
})

app.post("/api/notes", (req, res) => {
  const body = req.body;
  const addPerson = {
    id: notes.length + 1,
    content: body.content,
    date: new Date(),
    important: body.important || false
  }
  const newNote = notes.concat(addPerson)
  res.json(newNote)
})

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter(n => n.id !== id);
  res.status(204).end('data deleted')
})


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
