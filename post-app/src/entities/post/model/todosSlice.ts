import {
    createEntityAdapter,
    createSlice,
    EntityState,
    PayloadAction,
    createAsyncThunk,
  } from '@reduxjs/toolkit'
import { Todo } from '../../../shared/types/todo'
import { RootState } from '../../../app/providers/store'
export const todosAdapter = createEntityAdapter<Todo>({
    sortComparer: (a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1
      }
      return b.id - a.id
    },
  })

  export interface TodosState extends EntityState<Todo, number> {
    selectedTodoId: number | null
    selectedUserId: number | null
    loading: boolean
    error: string | null
  }
  const initialState: TodosState = todosAdapter.getInitialState({
    selectedTodoId: null,
    selectedUserId: null,
    loading: false,
    error: null,
  })

  export const fetchUserTodos = createAsyncThunk(
    'todos/fetchUserTodos',
    async (userId: number) => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
      if (!response.ok) {
        throw new Error('Failed to fetch todos')
      }
      return await response.json() as Todo[]
    }
  )

  const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
          },
          setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
          },
          clearError: (state) => {
            state.error = null
          },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchUserTodos.pending, (state) => {
            state.loading = true
            state.error = null
          })
          .addCase(fetchUserTodos.fulfilled, (state, action) => {
            todosAdapter.setAll(state, action.payload)
            state.loading = false
          })
          .addCase(fetchUserTodos.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to load todos'
          })
        }
})

export const selectTodosState = (state: RootState) => state.todos
export const selectSelectedTodoId = (state: RootState) => 
  state.todos.selectedTodoId
export const selectSelectedUserId = (state: RootState) => 
  state.todos.selectedUserId
export const selectLoading = (state: RootState) => state.todos.loading
export const selectError = (state: RootState) => state.todos.error
export default todosSlice.reducer
