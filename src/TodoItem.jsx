import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { useState } from 'react'
import EditModal from './EditModal'

function TodoItem({ todo, editTodo, deleteTodo, isDragging }) {
  const [modalOpen, setModalOpen] = useState(false)

  const handleEditTodo = () => {
    setModalOpen(true)
  }

  const saveTodo = (editedTodo) => {
    setModalOpen(false)
    editTodo(editedTodo)
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
          {todo.title}
        </CardHeader>
        <CardBody>
          {todo.description}
        </CardBody>
      </Card>
      <EditModal
        isOpen={modalOpen}
        setOpen={setModalOpen}
        saveTodo={saveTodo}
        todo={todo}
        deleteTodo={deleteTodo}
      />
    </>
  )
}

export default TodoItem