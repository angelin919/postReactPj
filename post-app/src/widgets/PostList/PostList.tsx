import React, { Fragment } from 'react';
import PostCard, { Post } from '../../entities/ui/PostCard';

interface PostListProps {
    posts: Post[]
}
const PostList: React.FC<PostListProps> = ({ posts }) => {
    return (
        <div style={{ display: 'flex', gap: '1rem' }}>
            {
                posts.map((post) => {
                    return (
                        <Fragment key={post.id}>
                            <PostCard post={post} />
                        </Fragment>
                    )

                })
            }

        </div>
    );
};

export default PostList;