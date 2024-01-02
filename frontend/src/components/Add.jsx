import React from 'react'

function Add({ handleChange,addItem, inputVal}) {

    

    return (
        <div>
            <input
                type="text"
                placeholder='Enter an item...'
                onChange={handleChange}
                value={inputVal}
            />

            <button onClick={addItem} >Add</button>
        </div>
    )
}

export default Add