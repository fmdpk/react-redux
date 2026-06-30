import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveNewTodo } from '../../api/fetchData'

const Header = () => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  const handleChange = (e) => setText(e.target.value)

  const addTodo = () => {
    // Create the thunk function with the text the user wrote
    const saveNewTodoThunk = saveNewTodo(text.trim())
    // Then dispatch the thunk function itself
    dispatch(saveNewTodoThunk)
    setText('')
  }

  const handleKeyDown = (e) => {
    const trimmedText = e.target.value.trim()
    // If the user pressed the Enter key:
    if (e.key === 'Enter' && trimmedText) {
      // Dispatch the "todo added" action with this text
      // Create the thunk function with the text the user wrote
      const saveNewTodoThunk = saveNewTodo(trimmedText)
      // Then dispatch the thunk function itself
      dispatch(saveNewTodoThunk)
      // And clear out the text input
      setText('')
    }
  }

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button className="button" onClick={addTodo}>
        Add
      </button>
    </header>
  )
}

export default Header
