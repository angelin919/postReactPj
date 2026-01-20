import { createEntityAdapter, createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../../shared/types/post'; 
import { apiPosts } from '../../../shared/api/postApi';
import { Comment } from '../../../shared/types/comment'; 

interface PostsState{
    posts:Post[]
    selectedPost: Post | null;
    comments: Comment[];
    loading: boolean;
    error: string | null;
    filter: string;
}
const initialState: PostsState = {
    posts: [],
    selectedPost: null,
    comments: [],
    loading: false,
    error: null,
    filter: ''
}

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_,{rejectWithValue}) => {
        try {
            console.log('🎬 Загружаем posts...');
            const posts = await apiPosts.getPosts();
            console.log(`✅ Загружено ${posts} posts`);
            return posts;
        } catch (error: any) {
            console.error('❌ Ошибка загрузки фильмов:', error);
            return rejectWithValue(error.message);
        }
    }

)
const postsSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{
                // Синхронные редьюсеры
                setFilter: (state, action: PayloadAction<string>) => {
                    state.filter = action.payload;
                },
                clearFilter: (state) => {
                    state.filter = '';
                },
                clearError: (state) => {
                    state.error = null;
                },
                clearSelectedPost: (state) => {
                    state.selectedPost = null;
                },
                clearComments: (state) => {
                    state.comments = [];
                },
                // Локальное добавление поста (оптимистичное обновление)
                addPostLocally: (state, action: PayloadAction<Post>) => {
                    state.posts.unshift(action.payload); // Добавляем в начало
                },
                // Локальное удаление поста (оптимистичное обновление)
                removePostLocally: (state, action: PayloadAction<number>) => {
                    state.posts = state.posts.filter(post => post.id !== action.payload);
                }

    }, extraReducers: (builder) =>{
        builder    
        .addCase(fetchPosts.pending, (state) => {
            console.log('⏳ fetchMovies PENDING');
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            console.log('✅ fetchMovies FULFILLED with:', action.payload);
            state.loading = false;
            state.posts = action.payload; // <-- Сохраняем в movies
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            console.log('❌ fetchMovies REJECTED:', action.payload);
            state.loading = false;
            state.error = action.payload as string;
        })
    }
})
export const {
    setFilter,

} = postsSlice.actions
// Селекторы
export const selectAllPosts = (state: { posts: PostsState }) => state.posts.posts;
export const selectComments = (state: { posts: PostsState }) => state.posts.comments;

export const selectLoading = (state: { posts: PostsState }) => state.posts.loading;
export const selectError = (state: { posts: PostsState }) => state.posts.error;
export const selectFilter = (state: { posts: PostsState }) => state.posts.filter;
export const selectFilteredPosts = (state: { posts: PostsState }) => {
    const filter = state.posts.filter.toLowerCase();
    return state.posts.posts.filter(post =>
        post.title.toLowerCase().includes(filter) ||
        post.body.toLowerCase().includes(filter)
    );
};
export default postsSlice.reducer