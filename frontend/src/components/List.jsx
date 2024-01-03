import React from 'react'
import Item from './Item'

function List({todos, deleteItem}) {
  return (
    <ul>
        {
            todos.map((itemObj, index) => (
                <Item name={itemObj.value} index={index} deleteItem={deleteItem} key={Math.random()}/>
            ))
        }
    </ul>
  )
}

export default List