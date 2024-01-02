import React from 'react'

function Item({name,index, deleteItem}) {
  return (
    <div>
      <div>
        {name}
      </div>
      <button onClick={() => deleteItem(index)} >delete</button>
    </div>
  )
}

export default Item