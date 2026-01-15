import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../../../entities/post/model/postsSlice'
import commentsReducer from '../../../entities/post/model/commentsSlice'
import albumsReducer from '../../../entities/post/model/albumsSlice'
import usersReducer from '../../../entities/post/model/usersSlice'
import todosReducer from '../../../entities/post/model/todosSlice'

import { api } from '../../../shared/api/api'
import { todosApi } from '../../../shared/api/todoApi'




export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        [todosApi.reducerPath]: todosApi.reducer,
        posts: postsReducer,
        comments: commentsReducer,
        albums: albumsReducer,
        users: usersReducer,
        todos: todosReducer,
        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(api.middleware)
            .concat(todosApi.middleware),
})

console.log('Store initialized:', store.getState());

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch