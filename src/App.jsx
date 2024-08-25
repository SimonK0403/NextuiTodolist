import { useState, useEffect } from 'react'
import TodoItem from './TodoItem'
import NewTodo from './NewTodo'
import ApplicationNavbar from './ApplicationNavbar'
import { Spacer, Button } from '@nextui-org/react'
import { Reorder } from 'framer-motion'
import useFetch from './components/useFetch'
import fetchData from './components/fetchData'

function App() {
  const [newId, setNewId] = useState(5)
  const [isDragging, setIsDragging] = useState(false)
  const [todos, setTodos] = useFetch("/todos") //Replace with fetchData?

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
    newTodos[index].order = index //prevent resetting to old order on edit
    setTodos(newTodos)
  }

  const deleteTodo = (id) => {
    let newTodos = todos.filter((todo) => todo.id != id)
    newTodos.forEach((todo, index) => todo.order = index)
    setTodos(newTodos)
    fetchData(`/delete/${id}`, "DELETE")
  }

  const handleReorder = (reorderedTodos) => {
    const updatedTodos = reorderedTodos.map((todo, index) => ({
      ...todo,
      order: index
    }))
    setTodos(updatedTodos)
  }

  const handleFetch = () => { //Test
    fetchData("/todos").then((data) => console.log("fetched: ", data))
  }

  return (
    <div>
      <ApplicationNavbar />
      <Button onClick={handleFetch}>Test</Button>
      <div className='mx-auto mt-5 max-w-3xl'>
        <NewTodo addTodo={addTodo} />
        <Spacer y={2} />
        <h2 className='font-bold text-2xl'>Aufgaben</h2>
        {todos && (
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
        )}
        {(todos == undefined || todos.length == 0) && (
          <p className='mt-2'>Keine Todos vorhanden</p>
        )}
      </div>
    </div>
  )
}

export default App
