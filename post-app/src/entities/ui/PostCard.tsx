import React from 'react';
export interface Post {
    id: number,
    title: string,
    body: string,
    userId: number

}
export interface Props {
    post: Post
}

const PostCard = ({ post }: Props) => {
    console.log(post)
    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '8px', 
            padding: '16px', 
            marginBottom: '16px',
            maxWidth: '400px',
            minHeight: '300px',
            overflow: 'hidden'        }}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <small>User ID: {post.userId}</small>
        </div>
    );
};

export default PostCard;