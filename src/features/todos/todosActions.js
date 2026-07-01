import { createSelector } from 'reselect'
import { fetchTodos } from '../../api/fetchData'
import { StatusFilters } from '../filters/filtersSlice'

export const getAllTodos = (dispatch) => {
  dispatch(fetchTodos)
}

export const todoCompleteChange = (data) => {
  return { type: 'todos/todoToggled', payload: data }
}

export const markAllActiveAction = () => {
  return { type: 'todos/allTodo' }
}

export const markAllCompleteAction = () => {
  return { type: 'todos/completedCleared' }
}

export const clearAllCompletedAction = () => {
  return { type: 'todos/allCompleted' }
}

export const selectFilteredTodos = createSelector(
  // First input selector: all todos
  (state) => state.todos,
  // Second input selector: current status filter
  (state) => state.filters.status,
  // Output selector: receives both values
  (todos, status) => {
    if (status === StatusFilters.All) {
      return todos.length
    }

    const completedStatus = status === StatusFilters.Completed
    // Return either active or completed todos based on filter
    return todos.filter((todo) => todo.completed === completedStatus).length
  }
)
