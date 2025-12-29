import React, { useMemo, useState } from 'react';
import { Post } from '../entities/ui/PostCard';
import { LengthFilter, filterByLength } from '../features/postLengthFilter/lib/filterByLength';
import { usePosts } from '../features/postList/model/hooks/usePosts';
import PostLenghtFilter from '../features/postLengthFilter/ui/PostLengthFilter';
import PostListWithLoading from '../widgets/PostList/PostListWithLoading';

const PostsPage = () => {
    // const [posts, setPosts] = useState<Post[]>([])
    // const [comments, setComments] = useState<Comment[]>([])
    // const [loading, setLoading] = useState(true)
    const [lengthFilter, setLengthFilter] = useState<LengthFilter>('all')
    const [searchFilter, setSearchFilter] = useState('')

    const { posts, comments, isLoading, isError, error, refetch } = usePosts()
    // Применяем фильтрацию по длине заголовка
    const filteredPosts = useMemo(() => {
        // 1. Фильтрация по длине
        let result = filterByLength(posts, lengthFilter)

        // 2. Фильтрация по тексту
        if (searchFilter) {
            console.log('searchFilter->', { searchFilter: searchFilter })
            result = result.filter(post =>
                post.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                post.body.toLowerCase().includes(searchFilter.toLowerCase())
            )
        }

        return result
    }, [posts, lengthFilter, searchFilter])
    console.log('Отладочная информация:', {
        posts:posts,
        postsCount: posts.length,
        filteredPostsCount: filteredPosts.length,
        lengthFilter,
        searchFilter,
        filterByLengthResult: filterByLength(posts, lengthFilter).length
    })

    if (isLoading) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <div>Загрузка постов...</div>
            </div>
        )
    }
    if (isError) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2 style={{ color: '#ef4444' }}>Ошибка</h2>
                <p>{error}</p>
                <button onClick={refetch}>Повторить</button>
            </div>
        )
    }
    return (
        <div>
                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Поиск по заголовку или тексту..."
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.5rem',
                            fontSize: '1rem',
                        }}
                    />
                </div>
                <PostLenghtFilter
                    currentFilter={lengthFilter}
                    onFilterChange={setLengthFilter}
                />


                <PostListWithLoading
                    posts={filteredPosts}
                    comments={comments}
                    isLoading={isLoading}
                />

        </div>
    );
};

export default PostsPage;