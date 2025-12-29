export interface User {
    id: number
    name: string
    email: string
  }
  
  export const mockUsers: User[] = [
    { id: 1, name: 'Иван Иванов', email: 'ivan@mail.ru' },
    { id: 2, name: 'Петр Петров', email: 'petr@mail.ru' },
    { id: 3, name: 'Анна Сидорова', email: 'anna@mail.ru' },
    { id: 4, name: 'Мария Кузнецова', email: 'maria@mail.ru' },
  ]
  
  export const getAllUsers = (): Promise<User[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockUsers])
      }, 500)
    })
  }
  
  export const getUserById = (id: number): Promise<User | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(user => user.id === id)
        resolve(user)
      }, 300)
    })
  }