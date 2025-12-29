import React, { useEffect, useState } from 'react';
import { Post } from '../entities/ui/PostCard';
import { Link, useParams } from 'react-router-dom';
import { getAllPosts } from '../shared/data/posts';
import { usePosts } from '../features/postList/model/hooks/usePosts';
import { Comment } from '../widgets/CommentList/CommentList';

const PostDetailsPage = () => {

    const { id } = useParams<{ id: string }>()
    const [post, setPost] = useState<Post | null>(null)
    const [comments, setComments] = useState<Comment[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    
    const { fetchPostById, fetchCommentsByPostId } = usePosts()

    useEffect(() => {
        const fetchPostData = async () => {
            if (!id) return
            
            try {
                setLoading(true)
                setError(null)
                
                const postId = Number(id)
                console.log('Fetching post with ID:', postId)
                
                // Получаем пост
                const postData = await fetchPostById(postId)
                console.log('Post data:', postData)
                
                if (postData) {
                    setPost(postData)
                    
                    // Получаем комментарии к посту
                    const postComments = await fetchCommentsByPostId(postId)
                    setComments(postComments)
                    console.log('Post comments:', postComments)
                } else {
                    setError(`Пост с ID ${id} не найден`)
                }
                
            } catch (err) {
                setError('Ошибка при загрузке данных')
                console.error('Error fetching post:', err)
            } finally {
                setLoading(false)
            }
        }
        
        fetchPostData()
    }, [id, fetchPostById, fetchCommentsByPostId])
   

    if (error || !post) {
        return (
            <div style={{ padding: '2rem' }}>
                <h2 style={{ color: '#ef4444' }}>Ошибка</h2>
                <p>{error || 'Пост не найден'}</p>
                <Link to="/posts" style={{ color: '#3b82f6' }}>
                    ← Вернуться к списку постов
                </Link>
            </div>
        )
    }

    return (
        <div>
            <h2 style={{ color: '#ef4444' }}>Здесь информация о посте</h2>

            <Link to="/posts" style={{ color: '#3b82f6' }}>
                ← Вернуться к списку постов
            </Link>

        </div>
    );
};

export default PostDetailsPage;