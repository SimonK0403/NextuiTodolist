const express = require("express")
const cors = require("cors")
const fs = require("fs")

const app = express()
app.use(cors())
app.use(express.json())
var todos = []
var newId = 5

app.get("/", (req, res) => {
  res.status(200).send("Server running")
})

app.get("/todos", (req, res) => {
  res.status(200).json(todos)
})

app.post("/addTodo", (req, res) => {
  var newTodo = req.body
  newTodo.id = newId
  newTodo.order = todos.length
  todos.push(newTodo)
  newId += 1
  res.status(200).json(todos)
})

app.put("/editTodo", (req, res) => {
  var newTodo = req.body
  const index = todos.findIndex((todo) => todo.id == newTodo.id)
  newTodo.order = index //prevent resetting to old order on edit
  todos[index] = newTodo
  res.status(200).json(todos)
})

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id
  todos = todos.filter((todo) => todo.id != id)
  todos.forEach((todo, index) => todo.order = index)
  res.status(200).json(todos)
})

app.put("/reorderTodos", (req, res) => {
  const reorderedTodos = req.body.map((todo, index) => ({
    ...todo,
    order: index
  }))
  todos = reorderedTodos
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