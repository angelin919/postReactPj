import React from 'react';
import useTodos from '../../shared/lib/hooks/useTodos';
interface TodoListProps {
    userId: number
  }
const UsersTodoList:React.FC<TodoListProps> = ({userId}) => {

    const {todos, completedTodos, isLoading, error, refetch} = useTodos()
    
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.toString()}</p>
    return (
        <div>
        <h3>Todos </h3>
     
        {todos.length > 0 ? (
          <div>
            <h4>Pending:</h4>
            <ul>
              {todos.map(todo => (
                <li key={todo.id}>{todo.title}</li>
              ))}
            </ul>
            
            <h4>Completed:</h4>
            <ul>
              {completedTodos.map(todo => (
                <li key={todo.id} style={{ textDecoration: 'line-through' }}>
                  {todo.title}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No todos found</p>
        )}
        
        <button onClick={refetch}>Refresh</button>
      </div>
    );
};

export default UsersTodoList;