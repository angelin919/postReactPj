import { Post } from "../../../shared/types/post" 

export type LengthFilter = 'all' | 'short' | 'medium' | 'long'
export const filterByLength = (posts: Post[], filter: LengthFilter): Post[] => {
    switch (filter) {
        case 'short':
            return posts.filter(post => post.title.length <= 20)
        case 'medium':
            return posts.filter(post => post.title.length > 20 && post.title.length <= 50)
        case 'long':
            return posts.filter(post => post.title.length > 50)
        case 'all':
        default:
            return posts

    }
}
export const getFilterLabel = (filter: LengthFilter): string => {
    switch(filter){
        case 'short': return 'Короткие <=20'
        case 'medium': return 'Средние 21-50'
        case 'long': return 'Длиные 21-50'
        case 'all': return 'Все посты'



    }
} 