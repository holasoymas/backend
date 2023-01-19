require('dotenv').config()
const express = require('express')
const app = express()
const data = require('./data')
const cors = require('cors')
const phonedata = require('./phonedata')
const Person = require('./models/person')
// const { default: mongoose } = require('mongoose')
const { info, error } = require('./utils/logger')
const dbroute = require('./controllers/routes')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

// const PORT = process.env.PORT || 8000

let notes = data.notes;
let persons = phonedata.persons

app.use('/api/db', dbroute)

app.get("/api/notes", (req, res) => {
  res.json(notes)
})

app.post("/api/database", (req, res) => {
  const body = req.body;
  if (body.name === undefined) {
    return res.status(400).json({ err: "name missing" })
  }
  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savePerson => {
    console.log(savePerson)
    res.json(savePerson)
  }).catch(err => `Error is ${err}`)
})

app.get('api/database/:id', (req, res) => {
  Person.findById(Number(request.params.id)).then(person => {
    res.json(person)
  })
})

app.get('/api/database', (req, res) => {
  Person.find({}).then(data => {
    res.json(data)
  })
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

// app.listen(PORT, () => {
//   info(`Listening on port ${PORT}`)
// })
