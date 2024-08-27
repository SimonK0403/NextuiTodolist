const express = require("express")
const cors = require("cors")
const fs = require("fs")

const app = express()
app.use(cors())
app.use(express.json())
var todos = []

//Endpoints
app.get("/", (req, res) => {
  res.status(200).send("Server running")
})

app.get("/todos", (req, res) => {
  res.status(200).json(todos)
})

app.post("/addTodo", (req, res) => {
  var newTodo = req.body
  newTodo.id = findFreeId()
  newTodo.order = todos.length
  todos.push(newTodo)
  persistTodos()
  res.status(200).json(todos)
})

app.put("/editTodo", (req, res) => {
  var newTodo = req.body
  const index = todos.findIndex((todo) => todo.id == newTodo.id)
  newTodo.order = index //prevent resetting to old order on edit
  todos[index] = newTodo
  persistTodos()
  res.status(200).json(todos)
})

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id
  todos = todos.filter((todo) => todo.id != id)
  todos.forEach((todo, index) => todo.order = index)
  persistTodos()
  res.status(200).json(todos)
})

app.put("/reorderTodos", (req, res) => {
  const reorderedTodos = req.body.map((todo, index) => ({
    ...todo,
    order: index
  }))
  todos = reorderedTodos
  persistTodos()
  res.status(200).json(todos)
})

//Auxiliary functions
function persistTodos() {
  fs.writeFile("data.json", JSON.stringify(todos, null, 2), (err) => {
    if(err) {
      console.error(err)
    }
  })
}

function findFreeId() {
  const sortedTodos = todos.sort((a, b) => a.id - b.id)
  for(let i = 0; i < sortedTodos.length; i++) {
    if(sortedTodos[i].id != i+1) {
      return i+1
    }
  }
  return sortedTodos.length+1
}

app.listen(8080, "0.0.0.0", () => {
  console.log("Server started")
  fs.readFile("data.json", (err, data) => {
    if (err) {
      // Create file if not exists
      fs.writeFile("data.json", "[]", (err) => {
        if(err) {
          console.error(err)
        }
      })
    } else {
      todos = JSON.parse(data)
    }
  })
})