import React from 'react';
import { Post } from '../../shared/types/post'
export interface PostCardProps {
    post: Post
}

const PostCard = ({ post }: PostCardProps) => {
    console.log(post)
    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px',
            maxWidth: '400px',
            minHeight: '300px',
            overflow: 'hidden'
        }}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <small>User ID: {post.userId}</small>
        </div>
    );
};

export default PostCard;