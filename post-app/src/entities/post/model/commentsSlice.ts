import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { commentsApi } from '../../../shared/api/commentsApi'
import { Comment } from '../../../shared/types/comment'; 
interface CommentsState {
    comments: Comment[]
    selectedComment: Comment | null;
    loading: boolean;
    error: string | null;
    postIdFilter: number | null;

}

const initialState: CommentsState = {
    comments: [],
    selectedComment: null,
    loading: false,
    error: null,
    postIdFilter: null
}


export const fetchComments = createAsyncThunk(

    'comments/fetchComments',
    async (_, { rejectWithValue }) => {
        try {
            console.log('📡 Загружаем комментарии...');
            const comments = await commentsApi.getComments();
            console.log(`✅ Загружено ${comments.length} комментариев`);
            return comments;
        } catch (error:any) {
            console.error('❌ Ошибка загрузки комментариев:', error);
            return rejectWithValue(error.message);
        }
    }
)
export const fetchCommentsByPostId = createAsyncThunk(
    'comments/fetchCommentsByPostId',
    async (postId: number, { rejectWithValue }) => {
        try {
            console.log(`📡 Загружаем комментарии для поста ${postId}...`);
            const comments = await commentsApi.getCommentsByPostId(postId);
            console.log(`✅ Загружено ${comments.length} комментариев для поста ${postId}`);
            return comments;
        } catch (error: any) {
            console.error(`❌ Ошибка загрузки комментариев для поста ${postId}:`, error);
            return rejectWithValue(error.message);
        }
    }
);

export const fetchCommentById = createAsyncThunk(
    'comments/fetchCommentById',
    async (id: number, { rejectWithValue }) => {
        try {
            console.log(`📡 Загружаем комментарий ${id}...`);
            const comment = await commentsApi.getCommentById(id);
            console.log(`✅ Комментарий ${id} загружен`);
            return comment;
        } catch (error: any) {
            console.error(`❌ Ошибка загрузки комментария ${id}:`, error);
            return rejectWithValue(error.message);
        }
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setPostIdFilter: (state, action: PayloadAction<number | null>) => {
            state.postIdFilter = action.payload;
        },
        clearPostIdFilter: (state) => {
            state.postIdFilter = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                console.log('⏳ fetchComments PENDING');
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                console.log('✅ fetchComments FULFILLED');
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                console.log('❌ fetchComments REJECTED:', action.payload);
                state.loading = false;
                state.error = action.payload as string;
            })
            // Обработка fetchCommentsByPostId
            .addCase(fetchCommentsByPostId.pending, (state) => {
                console.log('⏳ fetchCommentsByPostId PENDING');
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
                console.log('✅ fetchCommentsByPostId FULFILLED');
                state.loading = false;
                state.comments = action.payload;
                state.postIdFilter = action.payload[0]?.postId || null;
            })
            .addCase(fetchCommentsByPostId.rejected, (state, action) => {
                console.log('❌ fetchCommentsByPostId REJECTED:', action.payload);
                state.loading = false;
                state.error = action.payload as string;
            })

            // Обработка fetchCommentById
            .addCase(fetchCommentById.pending, (state) => {
                console.log('⏳ fetchCommentById PENDING');
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCommentById.fulfilled, (state, action) => {
                console.log('✅ fetchCommentById FULFILLED');
                state.loading = false;
                state.selectedComment = action.payload;
            })
            .addCase(fetchCommentById.rejected, (state, action) => {
                console.log('❌ fetchCommentById REJECTED:', action.payload);
                state.loading = false;
                state.error = action.payload as string;
            })
    }

})
export const {
    setPostIdFilter,
    clearPostIdFilter,
    clearError,
} = commentsSlice.actions
export const selectAllComments = (state: { comments: CommentsState }) => state.comments.comments;
export const selectLoading = (state: { comments: CommentsState }) => state.comments.loading;
export const selectError = (state: { comments: CommentsState }) => state.comments.error;


export default commentsSlice.reducer;
