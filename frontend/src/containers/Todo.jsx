import Add from '../components/Add';
import List from '../components/List';
import './Todo.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { v4 as generateID } from 'uuid';

function Todo() {

  const [todos, setTodos] = useState([])
  const [inputVal, setInputVal] = useState("")

  const handleChange = (e) => {
    setInputVal(e.target.value)
  }

  const addItem = async () => {

    const newID = generateID()
    const newItem = { id: newID, value: inputVal }

    setTodos([...todos, newItem])
    setInputVal("")

    await axios.put('http://localhost:3001/items/add/'+newID, { value: inputVal })
  }

  const deleteItem = async (index) => {
    const newTodos = todos.filter((item, i) => i !== index)
    setTodos(newTodos)

    await axios.delete('http://localhost:3001/items/delete/' + todos[index].id)
  }

  //load the initial todo list from server
  useEffect(() => {

    const fetch = async () => {
      try {
        let response = await axios.get('http://localhost:3001/items/get/')
        const dbData = response.data
        setTodos(dbData)
        console.log('refreshing')
      } catch (error) {
        console.error(error)
      }
    }

    fetch()
  }, [])

  return (
    <div>
      <Add
        handleChange={handleChange}
        addItem={addItem}
        inputVal={inputVal}
      />

      <List todos={todos} deleteItem={deleteItem} />
    </div>
  );
}

export default Todo;