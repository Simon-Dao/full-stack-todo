import Add from '../components/Add';
import List from '../components/List';
import './Todo.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { v4 as generateID } from 'uuid';

function Todo() {

  const [todos, setTodos] = useState([])
  const [inputVal, setInputVal] = useState("")
  const [serverRunning, setServerStatus] = useState(true)

  const handleChange = (e) => {
    setInputVal(e.target.value)
  }

  const addItem = async () => {
    try {
      const newID = generateID()
      const newItem = { id: newID, value: inputVal }

      setTodos([...todos, newItem])
      setInputVal("")

      await axios.put('http://localhost:3001/items/add/' + newID, { value: inputVal })
    } catch (error) {
      console.error(error)
      setServerStatus(false)
    }
  }

  const deleteItem = async (index) => {

    try {
      const newTodos = todos.filter((item, i) => i !== index)
      setTodos(newTodos)

      await axios.delete('http://localhost:3001/items/delete/' + todos[index].id)
    } catch (error) {
      console.error(error)
      setServerStatus(false)
    }

  }

  //load the initial todo list from server
  useEffect(() => {

    const fetch = async () => {
      try {
        let response = await axios.get('http://localhost:3001/items/get/')
        const dbData = response.data
        setTodos(dbData)
      } catch (error) {
        setServerStatus(false)
        console.error(error)
      }
    }

    fetch()
  }, [])

  return (
    <main>
      <Add
        handleChange={handleChange}
        addItem={addItem}
        inputVal={inputVal}
      />

      <List serverRunning={serverRunning} todos={todos} deleteItem={deleteItem} />
    </main>
  );
}

export default Todo;