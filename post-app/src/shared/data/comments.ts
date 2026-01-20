import { Comment } from "../types/comment" 

export const mockComments: Comment[] = [
    { 
      id: 1, 
      name: 'Первый комментарий', 
      body: 'Текст комментария для первого поста. Очень интересная статья!', 
      postId: 1, 
      email: 'user1@mail.ru' 
    },
    { 
      id: 2, 
      name: 'Второй комментарий', 
      body: 'Текст комментария для второго поста. Спасибо за полезную информацию!', 
      postId: 2, 
      email: 'user2@mail.ru' 
    },
    { 
      id: 3, 
      name: 'Третий комментарий', 
      body: 'Текст комментария для первого поста. Хотелось бы увидеть больше деталей.', 
      postId: 1, 
      email: 'user3@mail.ru' 
    },
    { 
      id: 4, 
      name: 'Четвертый комментарий', 
      body: 'Текст комментария для третьего поста. Полностью согласен с автором!', 
      postId: 3, 
      email: 'user4@mail.ru' 
    },
  ]
  export const getAllComments = (): Promise<Comment[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockComments])
      }, 500)
    })
  }
  
  export const getCommentsByPostId = (postId: number): Promise<Comment[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const postComments = mockComments.filter(comment => comment.postId === postId)
        resolve(postComments)
      }, 300)
    })
  }