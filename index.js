require('dotenv').config()
const express = require('express')
const app = express()
const data = require('./data')
const cors = require('cors')
const phonedata = require('./phonedata')
const Person = require('./models/person')
// const { default: mongoose } = require('mongoose')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

app.get("/api/db", (r, re) => {
  Person.find({}).then(r => {
    re.json(r)
  })
})

app.post("/api/db", async (req, res) => {
  const body = req.body;
  console.log(body);
  if (body.name === undefined && body.number === undefined) {
    return res.status(400).json({ err: "name missing" });
  }
  const person = new Person({
    name: body.name,
    number: body.number
  });
  try {
    const savedPerson = await person.save();
    res.status(200).json(savedPerson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/db/:id", (req, res) => {
  Person.findById(req.params.id).then(person => {
    if (!person) {
      res.status(404).json({ err: "NO data found" })
    } else {
      res.json(person)
    }
  })
    .catch(err => {
      console.log(err)
      res.status(400).send({ error: "malformatted id" })
    })
})

app.put("/api/db/:id", (req, res) => {
  const body = req.body
  const details = {
    name: body.name,
    number: body.number
  }
  // NOTE: new is done to reflect change when update is done, runValidators to apply validation on and context for some technical reason
  Person.findByIdAndUpdate(req.params.id, details, { new: true, runValidators: true, context: "query" })
    .then(updated => {
      res.json(updated)
      console.log(updated)
    })
    .catch(err => {
      console.log(err)
    })
})

app.delete("/api/db/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id).then(deleted => {
    res.status(204).end()
  })
    .catch(error => console.log(error))
})

const PORT = process.env.PORT

let notes = data.notes;
let persons = phonedata.persons

app.get("/api/notes", (req, res) => {
  res.json(notes)
})

// app.get('/api/database', (req, res) => {
//   Person.find({}).then(res => {
//     res.json(res)
//   })
// })
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


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
