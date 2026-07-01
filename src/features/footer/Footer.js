import React from 'react'

import { availableColors, capitalize } from '../filters/colors'
import {
  selectUncompletedTodosReselect,
  StatusFilters,
} from '../filters/filtersSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
  colorFilterChanged,
  statusFilterChanged,
} from '../filters/filtersActions'
import {
  clearAllCompletedAction,
  markAllActiveAction,
  markAllCompleteAction,
} from '../todos/todosActions'

const selectFilterStatus = (state) => {
  return state.filters.status
}

const selectFilterColors = (state) => {
  return state.filters.colors
}

const RemainingTodos = ({ count }) => {
  const suffix = count === 1 ? '' : 's'

  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  )
}

const StatusFilter = ({ value: status, onChange }) => {
  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key]
    const handleClick = () => onChange(value)
    const className = value === status ? 'selected' : ''

    return (
      <li key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    )
  })

  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  )
}

const ColorFilters = ({ value: colors, onChange }) => {
  const renderedColors = availableColors.map((color) => {
    const checked = colors.includes(color)
    const handleChange = () => {
      const changeType = checked ? 'removed' : 'added'
      onChange(color, changeType)
    }

    return (
      <label key={color}>
        <input
          type="checkbox"
          name={color}
          checked={checked}
          onChange={handleChange}
        />
        <span
          className="color-block"
          style={{
            backgroundColor: color,
          }}
        ></span>
        {capitalize(color)}
      </label>
    )
  })

  return (
    <div className="filters colorFilters">
      <h5>Filter by Color</h5>
      <form className="colorSelection">{renderedColors}</form>
    </div>
  )
}

const Footer = () => {
  const dispatch = useDispatch()
  const colors = useSelector(selectFilterColors)
  const status = useSelector(selectFilterStatus)
  const todosRemaining = useSelector(selectUncompletedTodosReselect)

  const onColorChange = (color, changeType) => {
    dispatch(colorFilterChanged(color, changeType))
  }

  const onStatusChange = (status) => {
    dispatch(statusFilterChanged(status))
  }

  const markAllCompleted = () => {
    dispatch(markAllCompleteAction())
  }

  const markAllActive = () => {
    dispatch(markAllActiveAction())
  }

  const clearAllCompleted = () => {
    dispatch(clearAllCompletedAction())
  }

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button" onClick={markAllCompleted}>
          Mark All Completed
        </button>
        <button className="button" onClick={markAllActive}>
          Mark All Active
        </button>
        <button className="button" onClick={clearAllCompleted}>
          Clear Completed
        </button>
      </div>

      <RemainingTodos count={todosRemaining.length} />
      <StatusFilter value={status} onChange={onStatusChange} />
      <ColorFilters value={colors} onChange={onColorChange} />
    </footer>
  )
}

export default Footer
