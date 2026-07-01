import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TodoListItem from './TodoListItem'
import {
  todoColorChange,
  todoCompleteChange,
  todoDeleted,
} from './todosActions'
import { createSelector } from 'reselect'
import { selectFilteredTodos } from './todosSlice'

export const selectTodoIdsReselect = createSelector(
  // First, pass one or more "input selector" functions:
  (state) => state,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  (state) => selectFilteredTodos(state)
)

const TodoList = () => {
  // const todoIds = useSelector(selectTodoIds, shallowEqual)
  const todoIds = useSelector(selectTodoIdsReselect)
  const dispatch = useDispatch()

  const onCompletedChange = (data) => dispatch(todoCompleteChange(data.id))

  const onDelete = (id) => dispatch(todoDeleted(id))
  const onColorChange = (data) => dispatch(todoColorChange(data))

  // since `todos` is an array, we can loop over it
  const renderedListItems = todoIds.map((todo) => {
    return (
      <TodoListItem
        key={todo.id}
        todoId={todo.id}
        onDelete={onDelete}
        onColorChange={onColorChange}
        onCompletedChange={onCompletedChange}
      />
    )
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
