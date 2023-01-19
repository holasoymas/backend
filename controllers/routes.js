const dbroute = require('express').Router()
const Person = require('../models/person')


dbroute.get("/", (r, re) => {
  Person.find({}).then(r => {
    re.json(r)
  })
})

dbroute.post("/", async (req, res) => {
  const body = req.body
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

dbroute.get("/:id", (req, res) => {
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

dbroute.put("/:id", (req, res) => {
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

dbroute.delete("/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end()
  })
    .catch(error => console.log(error))
})

module.exports = dbroute
