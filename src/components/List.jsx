import React from 'react'
import Item from './Item'

function List({todos, deleteItem}) {
  return (
    <ul>
        {
            todos.map((name, index) => (
                <Item name={name} index={index} deleteItem={deleteItem} key={Math.random()}/>
            ))
        }
    </ul>
  )
}

export default List