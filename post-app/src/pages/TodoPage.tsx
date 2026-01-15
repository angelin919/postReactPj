import { Link } from "react-router-dom"
import TodoList from "../widgets/Todo/TodoList"

const TodoPage: React.FC = () => {


    return (
      <div className="todo-page">
        <header className="todo-header">
          <h1>Список дел</h1>
          <Link to='/posts'>На главную</Link>

        </header>
        
        <main className="todo-content">
            <TodoList/>
        </main>
      </div>
    )
  }
  
  export default TodoPage