import React from 'react';
import PostCard, { Post } from '../../entities/ui/PostCard';

interface PostListProps{
    posts:Post[]
}
const PostList = ({posts}:PostListProps) => {
    return (
        <div style={{display:'flex', gap:'1rem'}}>
            {
                posts.map((post)=>{
                    return <PostCard  post={post}/>
                })
            }
            
        </div>
    );
};

export default PostList;