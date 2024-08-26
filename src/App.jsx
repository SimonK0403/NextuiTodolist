import { useState, useEffect } from 'react'
import TodoItem from './TodoItem'
import NewTodo from './NewTodo'
import ApplicationNavbar from './ApplicationNavbar'
import { Spacer } from '@nextui-org/react'
import { Reorder } from 'framer-motion'
import fetchData from './components/fetchData'

function App() {
  const [isDragging, setIsDragging] = useState(false)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    console.log(todos)
  }, [todos])

  useEffect(() => {
    fetchData("/todos").then((todos) => setTodos(todos))
  }, [])

  const addTodo = (newTodo) => {
    fetchData("/addTodo", "POST", newTodo).then((updatedTodos) => setTodos(updatedTodos))
  }

  const editTodo = (updatedTodo) => {
    fetchData("/editTodo", "PUT", updatedTodo).then((updatedTodos) => setTodos(updatedTodos))
  }

  const deleteTodo = (id) => {
    fetchData(`/delete/${id}`, "DELETE").then((updatedTodos => setTodos(updatedTodos)))
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
          {todos.sort((a, b) => a.order > b.order).map((todo) => (
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
        {(todos == undefined || todos.length == 0) && (
          <p className='mt-2'>Keine Todos vorhanden</p>
        )}
      </div>
    </div>
  )
}

export default App
