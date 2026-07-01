import { fetchTodos } from '../../api/fetchData'
import { StatusFilters } from '../filters/filtersSlice'

export const getAllTodos = (dispatch) => {
  dispatch(fetchTodos)
}

export const todoCompleteChange = (data) => {
  return { type: 'todos/todoToggled', payload: data }
}

export const todoColorChange = (data) => {
  return { type: 'todos/colorSelected', payload: data }
}

export const todoDeleted = (id) => {
  return { type: 'todos/todoDeleted', payload: id }
}

export const markAllActiveAction = () => {
  return { type: 'todos/allTodo' }
}

export const markAllCompleteAction = () => {
  return { type: 'todos/allCompleted' }
}

export const clearAllCompletedAction = () => {
  return { type: 'todos/completedCleared' }
}

export const selectFilteredTodosByStatus = (state) => {
  if (state.filters.status === StatusFilters.All) {
    return state.todos
  }
  const completedStatus = state.filters.status === StatusFilters.Completed
  return state.todos.filter((todo) => todo.completed === completedStatus)
}

export const selectFilteredTodosByColor = (state) => {
  if (state.filters.colors.length) {
    return state.todos.filter((todo) =>
      state.filters.colors.includes(todo.color)
    )
  }
  return state.todos
}
