import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Todo } from '../types/todo'

export const todosApi = createApi({
    reducerPath: 'todosApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com',
    }),
    tagTypes: ['Todo'],
    endpoints: (builder) => ({
        // Получение всех дел пользователя
        getUserTodos: builder.query<Todo[], number>({
            query: (userId) => `/users/${userId}/todos`,
            providesTags: (result, error, userId) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Todo' as const, id })),
                        { type: 'Todo', id: `USER_${userId}_LIST` },
                    ]
                    : [{ type: 'Todo', id: `USER_${userId}_LIST` }],
            transformResponse: (response: Todo[]) =>
                response.sort((a, b) => {
                    // Сначала невыполненные, потом выполненные
                    if (a.completed !== b.completed) {
                        return a.completed ? 1 : -1
                    }
                    // Затем по ID (новые сверху)
                    return b.id - a.id
                }),
        }),
        // Получение всех дел (опционально)
        getAllTodos: builder.query<Todo[], void>({
            query: () => '/todos',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Todo' as const, id })),
                        { type: 'Todo', id: 'LIST' },
                    ]
                    : [{ type: 'Todo', id: 'LIST' }],
        }),

        // Получение дела по ID
        getTodoById: builder.query<Todo, number>({
            query: (id) => `/todos/${id}`,
            providesTags: (result, error, id) => [{ type: 'Todo', id }],
        }),
    })
    })

    export const {
        useGetUserTodosQuery,
        useGetAllTodosQuery,
        useGetTodoByIdQuery,
    } = todosApi