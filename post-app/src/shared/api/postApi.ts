import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from '../../entities/ui/PostCard'
const BASE_URL = 'https://jsonplaceholder.typicode.com/'


class ApiPosts {
    async getPosts(): Promise<Post[]> {
        return this.request<Post[]>('/posts')
    }

    private async request<T>(endpoints: string, options?: RequestInit): Promise<T> {
        const url = `${BASE_URL}${endpoints}`
        console.log(` Запрос: ${url}`);

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...options?.headers
                }
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            return data as T
        } catch (error) {
            console.error(`❌ Ошибка запроса ${endpoints}:`, error);
            throw error;

        }
    }
}

export const apiPosts = new ApiPosts()