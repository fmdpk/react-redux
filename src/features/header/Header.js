import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const Header = () => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  const handleChange = (e) => setText(e.target.value)

  const addTodo = () => {
    dispatch({ type: 'todos/todoAdded', payload: text.trim() })
    setText('')
  }

  const handleKeyDown = (e) => {
    const trimmedText = e.target.value.trim()
    // If the user pressed the Enter key:
    if (e.key === 'Enter' && trimmedText) {
      // Dispatch the "todo added" action with this text
      dispatch({ type: 'todos/todoAdded', payload: trimmedText })
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
