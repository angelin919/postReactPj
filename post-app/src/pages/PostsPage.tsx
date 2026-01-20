import React, { useEffect, useMemo, useState } from 'react';
import { Post } from '../shared/types/post'; 
import { LengthFilter, filterByLength } from '../features/postLengthFilter/lib/filterByLength';
import { usePosts } from '../features/postList/model/hooks/usePosts';
import PostLenghtFilter from '../features/postLengthFilter/ui/PostLengthFilter';
import PostListWithLoading from '../widgets/PostList/PostListWithLoading';
import usePostsTwo from '../features/postList/model/hooks/usePostsTwo';
import { useComments } from '../shared/lib/hooks/useComments';

const PostsPage = () => {
    // const [posts, setPosts] = useState<Post[]>([])
    // const [comments, setComments] = useState<Comment[]>([])
    // const [loading, setLoading] = useState(true)
    const [lengthFilter, setLengthFilter] = useState<LengthFilter>('all')
    const [searchFilter, setSearchFilter] = useState('')
    // const { posts, comments, isLoading, isError, error, refetch } = usePosts()
    // Применяем фильтрацию по длине заголовка

    // const filteredPosts = useMemo(() => {
    //     // 1. Фильтрация по длине
    //     let result = filterByLength(posts, lengthFilter)

    //     // 2. Фильтрация по тексту
    //     if (searchFilter) {
    //         console.log('searchFilter->', { searchFilter: searchFilter })
    //         result = result.filter(post =>
    //             post.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    //             post.body.toLowerCase().includes(searchFilter.toLowerCase())
    //         )
    //     }
    //     return result
    // }, [posts, lengthFilter, searchFilter])
    const { posts, getPosts, setFilter, filteredPosts, loading: postsLoading, error: postsError } = usePostsTwo()
    const { comments, loading: commentsLoading, error: commentsError, getComments } = useComments()

    const filteredPostsFinal = useMemo(() => {
        if (!searchFilter) return filteredPosts
        return filteredPosts.filter(post =>
            post.title.toLocaleLowerCase().includes(searchFilter.toLocaleLowerCase()) ||
            post.body.toLocaleLowerCase().includes(searchFilter.toLocaleLowerCase())
        )
    }, [filteredPosts, searchFilter])
    useEffect(() => {
        getPosts()
        getComments();

    }, [getPosts, getComments])

    const refetch = () => {
        getPosts();
        getComments();

    };

    console.log('Отладочная информация:', {
        posts: posts,
        postsCount: posts.length,
        filteredPostsCount: filteredPosts.length,
        // lengthFilter,
        // searchFilter,
        // filterByLengthResult: filterByLength(posts, lengthFilter).length
    })

    const loading = postsLoading || commentsLoading;
    const error = postsError || commentsError;
    
    if (loading) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <div>Загрузка постов...</div>
            </div>
        )
    }
    if (error) {
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
                isLoading={loading}
            />

        </div>
    );
};

export default PostsPage;