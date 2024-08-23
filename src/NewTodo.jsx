import { Button, Card, CardBody, CardFooter, CardHeader, Input, Spacer, Textarea } from '@nextui-org/react'
import { useState } from 'react'

function NewTodo({ addTodo }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleAdd = () => {
    if (title != "") {
      const newTodo = {
        title: title,
        description: description,
        completed: false
      }
      addTodo(newTodo)
      setTitle("")
      setDescription("")
    }
  }

  return (
    <Card >
      <CardHeader className='font-bold text-2xl'>
        Neue Aufgabe
      </CardHeader>
      <CardBody className='space-y-2'>
        <Input
          variant='faded'
          label="Titel"
          placeholder="Name der Aufgabe"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <Textarea
          variant='faded'
          label="Beschreibung"
          placeholder='Beschreibe die Aufgabe'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </CardBody>
      <CardFooter>
        <Spacer x={"auto"} />
        <Button
          color='primary'
          className='font-bold'
          onClick={handleAdd}
        >
          Hinzufügen
        </Button>
      </CardFooter>
    </Card>
  )
}

export default NewTodo