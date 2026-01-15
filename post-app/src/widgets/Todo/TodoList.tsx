import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetAllTodosQuery } from '../../shared/api/todoApi'

const TodoList: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all')
  
  const { 
    data: todos = [], 
    isLoading, 
    error, 
    refetch 
  } = useGetAllTodosQuery()

  console.log({todos:todos})

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed
    if (filter === 'pending') return !todo.completed
    return true
  })

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
  }

  if (isLoading) {
    return (
      <div>
        <p>Loading todos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h3>Error loading todos</h3>
        <p>{(error as any).toString()}</p>
        <button onClick={refetch}>
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="todo-list-container">
      <div className="todo-list-header">
        <div >
          <h2>All Todos ({todos.length})</h2>
            <button onClick={refetch} className="refresh-button">
              Refresh
            </button>
        </div>

        <div className="stats-bar">
          <div>
            <span >Total:</span>
            <span>{stats.total}</span>
          </div>
          <div>
            <span>Completed:</span>
            <span>{stats.completed}</span>
          </div>
          <div>
            <span>Pending:</span>
            <span>{stats.pending}</span>
          </div>
        </div>

        <div className="filter-controls">
          <button 
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-button ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({stats.pending})
          </button>
          <button 
            className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({stats.completed})
          </button>
        </div>
      </div>

      <div className="todos-table">
        <div className="table-header">
          <div className="header-cell">Status</div>
          <div className="header-cell">Title</div>
          <div className="header-cell">User</div>
          <div className="header-cell">Actions</div>
        </div>

        <div className="table-body">
          {filteredTodos.map(todo => (
            <div key={todo.id} className="todo-row">
              <div className="cell status-cell">
                <span className={`status-badge ${todo.completed ? 'completed' : 'pending'}`}>
                  {todo.completed ? '✅' : '⭕'}
                </span>
              </div>
              
              <div className="cell title-cell">
                <Link to={`/todos/${todo.id}`} className="todo-link">
                  {todo.title}
                </Link>
              </div>
              
              <div className="cell user-cell">
                <Link to={`/users/${todo.userId}/todos`} className="user-link">
                  User {todo.userId}
                </Link>
              </div>
              
              <div className="cell actions-cell">
                <Link 
                  to={`/todos/${todo.id}/edit`}
                  className="action-button edit-button"
                >
                  Edit
                </Link>
                <Link 
                  to={`/todos/${todo.id}`}
                  className="action-button view-button"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredTodos.length === 0 && (
        <div className="no-todos">
          <p>No todos found{filter !== 'all' && ` in "${filter}" category`}</p>
          {filter !== 'all' && (
            <button onClick={() => setFilter('all')} className="clear-filter-button">
              Show All Todos
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default TodoList