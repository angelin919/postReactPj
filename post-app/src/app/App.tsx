import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Header from '../widgets/LayoutHeader/Header'
import Footer from '../widgets/LayoutFooter/Footer'
import PostCard, { Post } from '../entities/ui/PostCard'
import PostList from '../widgets/PostList/PostList'
import MainLayout from '../shared/layouts/MainLayout'
import ThemeProvider from '../shared/lib/theme/ThemeProvider'

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setPosts([
        { id: 1, title: 'Первый пост', body: 'Текст первого поста', userId: 1 },
        { id: 2, title: 'Второй пост', body: 'Текст второго поста', userId: 1 },
        { id: 3, title: 'Третий пост', body: 'Текст третьего поста', userId: 1 },
        { id: 4, title: 'Третий пост', body: 'Текст третьего поста', userId: 1 },
      ])
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return <div>Загрузкаююю</div>
  }
  return (
    <ThemeProvider>
      <MainLayout>
        <PostList posts={posts} />
      </MainLayout>
    </ThemeProvider>
  )
}

export default App
