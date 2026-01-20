import { Post } from "../types/post" 
export const mockPosts: Post[] = [
    { 
      id: 1, 
      title: 'Первый пост самый длинный пост о наступающих праздниках НГ и Рождестве', 
      body: 'Текст первого поста. Новый год - это волшебное время, которое приносит радость и надежду.', 
      userId: 1 
    },
    { 
      id: 2, 
      title: 'Второй пост', 
      body: 'Текст второго поста. Здесь мы обсуждаем важные темы и делимся мыслями.', 
      userId: 1 
    },
    { 
      id: 3, 
      title: 'Третий пост', 
      body: 'Текст третьего поста. Каждый день - это новая возможность для роста и развития.', 
      userId: 2 
    },
    { 
      id: 4, 
      title: 'Четвертый пост', 
      body: 'Текст четвертого поста. Технологии меняют наш мир, и мы должны идти в ногу со временем.', 
      userId: 3 
    },
    { 
      id: 5, 
      title: 'Пятый пост с очень длинным заголовком, чтобы протестировать фильтрацию по длине', 
      body: 'Этот пост демонстрирует как работает фильтрация по длине заголовка.', 
      userId: 2 
    },
    { 
      id: 6, 
      title: 'Шестой пост', 
      body: 'Короткий пост для тестирования.', 
      userId: 3 
    },
  ]
  export const getAllPosts = (): Promise<Post[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockPosts])
      }, 500)
    })
  }
  
  export const getPostById = (id: number): Promise<Post | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const post = mockPosts.find(post => post.id === id)
        resolve(post)
      }, 300)
    })
  }
  
  export const getPostsByUserId = (userId: number): Promise<Post[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userPosts = mockPosts.filter(post => post.userId === userId)
        resolve(userPosts)
      }, 400)
    })
  }