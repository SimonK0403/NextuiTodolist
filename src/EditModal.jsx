import { Input, Textarea, Button, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, Spacer, Checkbox } from "@nextui-org/react"
import { useState, useEffect } from "react"
import { TrashIcon } from "@heroicons/react/24/outline"

function EditModal({ isOpen, setOpen, saveTodo, todo, deleteTodo }) {
  const [editingTodo, setEditingTodo] = useState(todo)

  //To update the todo when it is changed in the parent (completed)
  useEffect(() => {
    setEditingTodo(todo)
  }, [todo])

  const handleSaveTodo = () => {
    saveTodo(editingTodo)
  }

  const handleChangeTitle = (newTitle) => {
    setEditingTodo((oldTodo) => ({
      ...oldTodo,
      title: newTitle
    }))
  }

  const handleChangeDescription = (newDescription) => {
    setEditingTodo((oldTodo) => ({
      ...oldTodo,
      description: newDescription
    }))
  }

  const handleDeleteTodo = () => {
    deleteTodo(editingTodo.id)
  }

  const handleChangeCompleted = (newCompleted) => {
    setEditingTodo((oldTodo) => ({
      ...oldTodo,
      completed: newCompleted
    }))
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)} size='3xl' hideCloseButton>
      <ModalContent>
        <ModalHeader className="font-bold">
          Aufgabe bearbeiten
          <Spacer x={"auto"} />
          <Button
            color="danger"
            isIconOnly
            variant="light"
            onClick={handleDeleteTodo}
          >
            <TrashIcon width={24} />
          </Button>
        </ModalHeader>
        <ModalBody>
          <Input
            value={editingTodo.title}
            variant="faded"
            label="Titel"
            placeholder="Name der Aufgabe"
            onChange={(event) => handleChangeTitle(event.target.value)}
          />
          <Textarea
            value={editingTodo.description}
            variant="faded"
            label="Beschreibung"
            placeholder="Beschreibe die Aufgabe"
            onChange={(event) => handleChangeDescription(event.target.value)}
          />
          <Checkbox
            isSelected={editingTodo.completed}
            onChange={(event) => handleChangeCompleted(event.target.checked)}
          >
            Abgeschlossen
          </Checkbox>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => setOpen(false)}
            className="font-bold"
          >
            Abbrechen
          </Button>
          <Spacer x={"auto"} />
          <Button
            color='primary'
            onClick={handleSaveTodo}
            className="font-bold"
          >
            Speichern
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditModal