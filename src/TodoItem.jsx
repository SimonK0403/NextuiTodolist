import { Card, CardBody, CardHeader, CardFooter, Checkbox } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import EditModal from './EditModal'
import StrikableText from './components/StrikableText'

function TodoItem({ todo, editTodo, deleteTodo, isDragging }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentTodo, setCurrentTodo] = useState(todo)

  useEffect(() => {
    editTodo(currentTodo)
  }, [currentTodo])

  const handleEditTodo = () => {
    setModalOpen(true)
  }

  const saveTodo = (editedTodo) => {
    setModalOpen(false)
    setCurrentTodo(editedTodo)
  }

  const handleComplete = (newCompleted) => {
    setCurrentTodo((oldTodo) => ({
      ...oldTodo, 
      completed: newCompleted
    }))
  }

  return (
    <>
      <Card
        className='mt-2 flex'
        isHoverable
        isPressable={!isDragging}
        fullWidth
        onClick={handleEditTodo}
      >
        <CardHeader className="font-bold">
          <StrikableText stroked={currentTodo.completed}>
            {currentTodo.title}
          </StrikableText>
        </CardHeader>
        <CardBody>
          <StrikableText stroked={currentTodo.completed}>
            {currentTodo.description}
          </StrikableText>
        </CardBody>
        <CardFooter>
          <Checkbox
            isSelected={currentTodo.completed}
            onChange={(event) => handleComplete(event.target.checked)}
          >
            Abgeschlossen
          </Checkbox>
        </CardFooter>
      </Card>
      <EditModal
        key={currentTodo.id}
        isOpen={modalOpen}
        setOpen={setModalOpen}
        saveTodo={saveTodo}
        todo={currentTodo}
        deleteTodo={deleteTodo}
      />
    </>
  )
}

export default TodoItem