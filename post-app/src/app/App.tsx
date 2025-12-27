import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Header from '../widgets/LayoutHeader/Header'
import Footer from '../widgets/LayoutFooter/Footer'
import PostCard, { Post } from '../entities/ui/PostCard'
import PostList from '../widgets/PostList/PostList'
import MainLayout from '../shared/layouts/MainLayout'
import ThemeProvider from '../shared/lib/theme/ThemeProvider'
import { Comment } from '../widgets/CommentList/CommentList'
import PostListWithLoading from '../widgets/PostList/PostListWithLoading'
import PostLenghtFilter from '../features/postLengthFilter/ui/PostLengthFilter'
import { LengthFilter, filterByLength } from '../features/postLengthFilter/lib/filterByLength'

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [lengthFilter, setLengthFilter] = useState<LengthFilter>('all')
  const [searchFilter, setSearchFilter] = useState('')


  useEffect(() => {
    setTimeout(() => {
      setPosts([
        { id: 1, title: 'Первый пост самый длиный пост о наступающих праздниках НГ и Рождестве', body: 'Текст первого поста', userId: 1 },
        { id: 2, title: 'Второй пост', body: 'Текст второго поста', userId: 1 },
        { id: 3, title: 'Третий пост', body: 'Текст третьего поста', userId: 1 },
        { id: 4, title: 'Третий пост', body: 'Текст третьего поста', userId: 1 },
      ])
      setComments([{ id: 1, name: 'Первый комментарий', body: 'Текст комментария для первого поста', postId: 1, email: 's@mail.ru' },
      { id: 1, name: 'Первый комментарий', body: 'Текст комментария для второго поста', postId: 2, email: 's@mail.ru' },
      ])
      setLoading(false)
    }, 500)
  }, [])
  // Применяем фильтрацию по длине заголовка
  const filteredPosts = useMemo(() => {
    // 1. Фильтрация по длине
    let result = filterByLength(posts, lengthFilter)
    
    // 2. Фильтрация по тексту
    if (searchFilter) {
      console.log('searchFilter->',{searchFilter:searchFilter})
      result = result.filter(post =>
        post.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        post.body.toLowerCase().includes(searchFilter.toLowerCase())
      )
    }
    
    return result
  }, [posts, lengthFilter, searchFilter])
  console.log('Отладочная информация:', {
    postsCount: posts.length,
    filteredPostsCount: filteredPosts.length,
    lengthFilter,
    searchFilter,
    filterByLengthResult: filterByLength(posts, lengthFilter).length
  })
  if (loading) {
    return <div>Загрузкаююю</div>
  }
  return (
    <ThemeProvider>
      <MainLayout>
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
    </MainLayout>
    </ThemeProvider >
  )
}

export default App
