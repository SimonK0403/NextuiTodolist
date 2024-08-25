const express = require("express")
const cors = require("cors")
const fs = require("fs")

const app = express()
app.use(cors())
var todos = []

app.get("/", (req, res) => {
  res.status(200).send("Server running")
})

app.get("/todos", (req, res) => {
  res.status(200).json(todos)
})

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id
  todos = todos.filter((todo) => todo.id != id)
  todos.forEach((todo, index) => todo.order = index)
  res.status(200).json(todos)
})

app.listen(8080, "0.0.0.0", () => {
  console.log("Server started")
  fs.readFile("data.json", (err, data) => {
    if (err) {
      console.error(err)
    }
    todos = JSON.parse(data)
  })
})