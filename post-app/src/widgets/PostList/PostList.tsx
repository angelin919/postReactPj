import React, { Fragment, memo, useMemo } from 'react';
import PostCard, { Post } from '../../entities/ui/PostCard';
import CommentList, { Comment } from '../CommentList/CommentList'
import { Link } from 'react-router-dom';

interface PostListProps {
    posts: Post[]
    comments: Comment[]
    filter?: string
}
const PostList: React.FC<PostListProps> = memo(({ posts, comments, filter = '' }) => {

    const filteredPosts = useMemo(() => {
        if (!filter) return posts
        return posts.filter(post => post.title.toLowerCase().includes(filter.toLowerCase()))
    }, [posts, filter])

    if (filteredPosts.length === 0) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '3rem',
                color: '#6b7280'
            }}>
                <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                    Посты не найдены
                </p>
                <p style={{ fontSize: '0.875rem' }}>
                    Попробуйте изменить параметры фильтрации
                </p>
            </div>
        )
    }
    return (
        <div style={{ display: 'flex', gap: '1rem' }}>

            {
                filteredPosts.map((post) => {
                    return (
                        <Fragment key={post.id} >
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                flex: '1 1 300px',
                            }}>
                                <Link to={`/posts/${post.id}`}>
                                    <PostCard post={post} />
                                </Link>
                                <CommentList
                                    comments={comments}
                                    postId={post.id}
                                />
                            </div>

                        </Fragment>
                    )

                })
            }

        </div>
    );
});

export default PostList;