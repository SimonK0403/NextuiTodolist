import { useState, useEffect } from 'react'
import TodoItem from './TodoItem'
import NewTodo from './NewTodo'
import ApplicationNavbar from './ApplicationNavbar'
import { Spacer } from '@nextui-org/react'
import { Reorder } from 'framer-motion'

function App() {
  const [newId, setNewId] = useState(5)
  const [isDragging, setIsDragging] = useState(false)
  const [todos, setTodos] = useState([
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
  ])

  useEffect(() => {
    console.log(todos)
  }, [todos])

  const addTodo = (newTodo) => {
    newTodo.id = newId
    newTodo.order = todos.length + 1
    setTodos([...todos, newTodo])
    setNewId(newId + 1)
  }

  const editTodo = (newTodo) => {
    const index = todos.findIndex((todo) => todo.id == newTodo.id)
    let newTodos = [...todos]
    newTodos[index] = newTodo
    setTodos(newTodos)
  }

  const deleteTodo = (id) => {
    let newTodos = todos.filter((todo) => todo.id != id)
    newTodos.forEach((todo, index) => todo.order = index)
    setTodos(newTodos)
  }

  const handleReorder = (reorderedTodos) => {
    const updatedTodos = reorderedTodos.map((todo, index) => ({
      ...todo,
      order: index
    }))
    setTodos(updatedTodos)
  }

  return (
    <div>
      <ApplicationNavbar />
      <div className='mx-auto mt-5 max-w-3xl'>
        <NewTodo addTodo={addTodo} />
        <Spacer y={2} />
        <h2 className='font-bold text-2xl'>Aufgaben</h2>
        <Reorder.Group axis="y" onReorder={handleReorder} values={todos}>
          {todos.map((todo) => (
            <Reorder.Item 
              value={todo} 
              key={todo.id} 
              onDragStart={() => setIsDragging(true)} 
              onDragEnd={() => setIsDragging(false)}
            >
              <TodoItem todo={todo} editTodo={editTodo} deleteTodo={deleteTodo} isDragging={isDragging} />
            </Reorder.Item>
          ))}
        </Reorder.Group>
        {(todos.length == 0) && (
          <p className='mt-2'>Keine Todos vorhanden</p>
        )}
      </div>
    </div>
  )
}

export default App
