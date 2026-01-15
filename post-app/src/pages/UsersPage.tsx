import React from 'react'
import UserList from '../widgets/UserList/UserList'
import { Link } from 'react-router-dom'

const UsersPage: React.FC = () => {
  return (
    <div className="users-page">
      <header className="page-header">
        <h1>Список пользователей</h1>
        <Link to='/posts'>На главную</Link>

      </header>
      
      <main className="page-content">
        <UserList />
      </main>
    </div>
  )
}

export default UsersPage