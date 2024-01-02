import Add from '../components/Add';
import List from '../components/List';
import './Todo.css';
import { useState } from 'react';

function Todo() {

  const [todos, setTodos] = useState([])
  const [inputVal, setInputVal] = useState("")

  const handleChange = (e) => {
    setInputVal(e.target.value)
  }

  const addItem = (e) => {
    setTodos([...todos, inputVal])
    setInputVal("")
  }

  const deleteItem = (index) => {
    const newTodos = todos.filter((item, i) => i !== index)
    setTodos(newTodos)
  }

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