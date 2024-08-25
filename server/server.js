const express = require("express")

const app = express()

var todos = [
  {
    id: 1,
    title: "Erstes Todo",
    description: "Beschreibung für erstes Todo",
    order: 0,
    completed: false
  },
  {
    id: 2,
    title: "Zweites Todo",
    description: "Beschreibung für zweites Todo",
    order: 1,
    completed: false
  },
  {
    id: 3,
    title: "Drittes Todo",
    description: "Beschreibung für drittes Todo",
    order: 2,
    completed: false
  },
  {
    id: 4,
    title: "Viertes Todo",
    description: "Beschreibung für viertes Todo",
    order: 3,
    completed: false
  },
]

app.get("/", (req, res) => {
  res.status(200).send("Server running")
})

app.get("/todos", (req, res) => {
  res.status(200).json(todos)
})

app.listen(8080, () => {
  console.log("Server started")
})