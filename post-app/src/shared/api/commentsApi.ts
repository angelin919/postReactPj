import { Comment } from "../types/comment"; 

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export class CommentsApi {
async getComments(): Promise<Comment[]>{
    return this.request<Comment[]>('/comments')
}
async getCommentById(id: number): Promise<Comment> {
    return this.request<Comment>(`/comments/${id}`);
}
async getCommentsByPostId(postId: number): Promise<Comment[]> {
    return this.request<Comment[]>(`/comments?postId=${postId}`);
}
    private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const url = `${BASE_URL}${endpoint}`;
        console.log(`📡 Комментарии запрос: ${url}`);

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...options?.headers,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(`✅ Комментарии ответ получен: ${endpoint}`, data);
            return data as T;
        } catch (error) {
            console.error(`❌ Ошибка запроса комментариев ${endpoint}:`, error);
            throw error;
        }
    }
}

export const commentsApi = new CommentsApi()