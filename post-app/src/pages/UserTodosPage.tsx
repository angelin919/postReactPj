import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
interface Todo {
    id: string
    userId: string
    title: string
    completed: boolean
}
const UserTodosPage = () => {
    const { userId } = useParams<{ userId: string }>()
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState(true)
    console.log({ userId: userId })
    useEffect(() => {
        setTodos([{ id: '1', userId: '1', title: 'title', completed: false },
        ])
        setLoading(false)

    }, [])
    return (
        <div>
            <h1 style={{ marginBottom: '1.5rem' }}>Задачи пользователя {userId}</h1>
            <Link to="/posts" style={{ color: '#3b82f6' }}>
                ← Вернуться к списку постов
            </Link>
        </div>
    );
};

export default UserTodosPage;

