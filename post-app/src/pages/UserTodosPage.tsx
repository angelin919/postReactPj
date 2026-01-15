import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TodoList from '../widgets/Todo/UsersTodoList';
interface Todo {
    id: string
    userId: string
    title: string
    completed: boolean
}
const UserTodosPage = () => {
    const { userId } = useParams<{ userId: string }>()

    if (!userId) {
        return (
            <div >
                <h2>Нет userId</h2>
            </div>
        )
    }
    return (
        <div>
            <h1 style={{ marginBottom: '1.5rem' }}>Задачи пользователя {userId}</h1>
            <div className="user-todos-page">
                <TodoList userId={Number(userId)} />
            </div>
            <Link to="/posts" style={{ color: '#3b82f6' }}>
                ← Вернуться к списку постов
            </Link>
        </div>
    );
};

export default UserTodosPage;

