import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TodoListItem from './TodoListItem'
import { StatusFilters } from '../filters/filtersSlice'
import {
  todoColorChange,
  todoCompleteChange,
  todoDeleted,
} from './todosActions'
import { createSelector } from 'reselect'

const selectTodoIds = (state) => {
  switch (state.filters.status) {
    case StatusFilters.All:
      if (state.filters.colors.length) {
        return state.todos
          .filter((item) => state.filters.colors.includes(item.color))
          .map((todo) => todo.id)
      }
      return state.todos.map((todo) => todo.id)
    case StatusFilters.Active:
      if (state.filters.colors.length) {
        let todos = state.todos.filter((item) => item.completed === false)
        return todos
          .filter((item) => state.filters.colors.includes(item.color))
          .map((todo) => todo.id)
      }
      return state.todos
        .filter((item) => item.completed === false)
        .map((todo) => todo.id)
    case StatusFilters.Completed:
      if (state.filters.colors.length) {
        let todos = state.todos.filter((item) => item.completed === true)
        return todos
          .filter((item) => state.filters.colors.includes(item.color))
          .map((todo) => todo.id)
      }
      return state.todos
        .filter((item) => item.completed === true)
        .map((todo) => todo.id)
    default:
      return state.todos.map((todo) => todo.id)
  }
}

export const selectTodoIdsReselect = createSelector(
  // First, pass one or more "input selector" functions:
  (state) => state,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  (state) => selectTodoIds(state)
)

const TodoList = () => {
  // const todoIds = useSelector(selectTodoIds, shallowEqual)
  const todoIds = useSelector(selectTodoIdsReselect)
  const dispatch = useDispatch()

  const onCompletedChange = (data) => dispatch(todoCompleteChange(data.id))

  const onDelete = (id) => dispatch(todoDeleted(id))
  const onColorChange = (data) => dispatch(todoColorChange(data))

  // since `todos` is an array, we can loop over it
  const renderedListItems = todoIds.map((id) => {
    return (
      <TodoListItem
        key={id}
        todoId={id}
        onDelete={onDelete}
        onColorChange={onColorChange}
        onCompletedChange={onCompletedChange}
      />
    )
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
