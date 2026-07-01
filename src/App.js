import React, { useEffect } from 'react'

import Header from './features/header/Header'
import TodoList from './features/todos/TodoList'
import Footer from './features/footer/Footer'
import { useDispatch } from 'react-redux'
import { getAllTodos } from './features/todos/todosActions'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    getAllTodos(dispatch)
  }, [])
  return (
    <div className="App">
      <nav>
        <section>
          <h1>Redux Fundamentals Example</h1>
        </section>
      </nav>
      <main>
        <section className="medium-container">
          <h2>Todos</h2>
          <div className="todoapp">
            <Header />
            <TodoList />
            <Footer />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
