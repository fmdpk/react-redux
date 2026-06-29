import React from 'react'

import { ReactComponent as TimesSolid } from './times-solid.svg'

import { availableColors, capitalize } from '../filters/colors'
import { useSelector } from 'react-redux'

const selectTodoById = (state, todoId) => {
  return state.todos.find((todo) => todo.id === todoId)
}

const TodoListItem = ({
  todoId,
  onColorChange,
  onCompletedChange,
  onDelete,
}) => {
  // const { text, completed, color, id } = todo

  const todo = useSelector((state) => selectTodoById(state, todoId))
  const { text, completed, color } = todo

  const handleCompletedChanged = (e) => {
    onCompletedChange({ id: todoId, checked: e.target.checked })
  }

  const handleColorChanged = (e) => {
    onColorChange({ todoId: todoId, color: e.target.value })
  }

  const handleOnDelete = (e) => {
    onDelete(todoId)
  }

  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ))

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{ color }}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={handleOnDelete}>
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
