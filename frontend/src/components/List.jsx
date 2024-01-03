import React from 'react'
import Item from './Item'

function List({ todos, serverRunning, deleteItem }) {

  let content = (<>{
    todos.map((itemObj, index) => (
      <Item name={itemObj.value} index={index} deleteItem={deleteItem} key={Math.random()} />
    ))
  }</>)

  if (!serverRunning) {
    content = (
      <>
        Sorry! Our servers are under maintenance. <br/> Maybe try reloading?
      </>
    )
  }

  return (
    <ul>
      {content}
    </ul>
  )
}

export default List