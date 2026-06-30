// import { client } from './client'

import { client } from './client'

// Write a function that has `dispatch` and `getState` as arguments without using redux-thunk
// export const fetchSomeData = (dispatch, getState) => {
//   // Make an async HTTP request
//   client.get('fakeApi/todos').then((todos) => {
//     console.log(todos)
//     // Dispatch an action with the todos we received
//     dispatch({ type: 'todos/todosLoaded', payload: todos.todos })
//     // Check the updated store state after dispatching
//     const allTodos = getState().todos
//     console.log('Number of todos after loading: ', allTodos.length)
//   })
// }

// Thunk function
export async function fetchTodos(dispatch, getState) {
  const response = await client.get('/fakeApi/todos')
  const stateBefore = getState()
  console.log('Todos before dispatch: ', stateBefore.todos.length)

  dispatch({ type: 'todos/todosLoaded', payload: response.todos })

  const stateAfter = getState()
  console.log('Todos after dispatch: ', stateAfter.todos.length)
}

// Write a synchronous outer function that receives the `text` parameter:
export function saveNewTodo(text) {
  // And then creates and returns the async thunk function:
  return async function saveNewTodoThunk(dispatch, getState) {
    // ✅ Now we can use the text value and send it to the server
    const initialTodo = { text }
    const response = await client.post('/fakeApi/todos', { todo: initialTodo })
    dispatch({ type: 'todos/todoAdded', payload: response.todo })
  }
}
