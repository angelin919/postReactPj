import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePosts } from '../features/postList/model/hooks/usePosts';

const UserPostsPage = () => {
    const { userId } = useParams<{ userId: string }>()
    const numericUserId = userId ? parseInt(userId, 10) : undefined

    // const { posts, loading, error } = usePosts({
    //     userId: numericUserId
    // })

    return (
        <div>
            <h1 style={{ marginBottom: '1.5rem' }}>
                Посты пользователя {userId}
            </h1>
            <Link to="/posts" style={{ color: '#3b82f6' }}>
                ← Вернуться к списку постов
            </Link>

        </div>
    );
};

export default UserPostsPage;