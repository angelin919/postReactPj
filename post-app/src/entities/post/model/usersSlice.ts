import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
    createAsyncThunk,
  } from '@reduxjs/toolkit'
  import { api } from '../../../shared/api/api'
  import { User } from '../../../shared/types/user'
  
  // Создаем thunk для загрузки пользователей
  export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, { dispatch }) => {
      const result = await dispatch(api.endpoints.getUsers.initiate())
      
      if (result.data) {
        return result.data
      }
      throw new Error(result.error?.toString() || 'Failed to fetch users')
    }
  )
  
  // Создаем thunk для загрузки пользователя по ID
  export const fetchUserById = createAsyncThunk(
    'users/fetchUserById',
    async (userId: number, { dispatch }) => {
      const result = await dispatch(api.endpoints.getUserById.initiate(userId))
      
      if (result.data) {
        return result.data
      }
      throw new Error(result.error?.toString() || 'Failed to fetch user')
    }
  )
  
  // Создаем адаптер для пользователей
  export const usersAdapter = createEntityAdapter<User>({
    sortComparer: (a, b) => a.name.localeCompare(b.name),
  })
  
  // Создаем начальное состояние
  const initialState = usersAdapter.getInitialState({
    selectedUserId: null as number | null,
    filter: '',
    loading: false,
    error: null as string | null,
  })
  
  export type UsersState = typeof initialState
  
  const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      setFilter: (state, action: PayloadAction<string>) => {
        state.filter = action.payload
      },
      clearFilter: (state) => {
        state.filter = ''
      },
      setSelectedUserId: (state, action: PayloadAction<number>) => {
        state.selectedUserId = action.payload
      },
      clearSelectedUserId: (state) => {
        state.selectedUserId = null
      },
      setError: (state, action: PayloadAction<string | null>) => {
        state.error = action.payload
      },
      clearError: (state) => {
        state.error = null
      },
      // Редьюсер для добавления/обновления пользователей вручную
      upsertUsers: (state, action: PayloadAction<User[]>) => {
        usersAdapter.upsertMany(state, action.payload)
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUsers.pending, (state) => {
          state.loading = true
          state.error = null
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          usersAdapter.setAll(state, action.payload)
          state.loading = false
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.loading = false
          state.error = action.error.message || 'Failed to load users'
        })
        .addCase(fetchUserById.fulfilled, (state, action) => {
          usersAdapter.upsertOne(state, action.payload)
        })
    },
  })
  
  // ========== СЕЛЕКТОРЫ ==========
  
  // Тип для корневого состояния
  type RootStateWithUsers = {
    users: UsersState
  }
  
  // Базовые селекторы адаптера
  const usersSelectors = usersAdapter.getSelectors()
  
  // Селекторы для работы с корневым состоянием
  export const selectAllUsers = (state: RootStateWithUsers) => 
    usersSelectors.selectAll(state.users)
  
  export const selectUserById = (state: RootStateWithUsers, id: number) => 
    usersSelectors.selectById(state.users, id)
  
  export const selectUserIds = (state: RootStateWithUsers) => 
    usersSelectors.selectIds(state.users)
  
  export const selectUserEntities = (state: RootStateWithUsers) => 
    usersSelectors.selectEntities(state.users)
  
  export const selectTotalUsers = (state: RootStateWithUsers) => 
    usersSelectors.selectTotal(state.users)
  
  // Кастомные селекторы
  export const selectUsersState = (state: RootStateWithUsers) => state.users
  export const selectFilter = (state: RootStateWithUsers) => state.users.filter
  export const selectSelectedUserId = (state: RootStateWithUsers) => 
    state.users.selectedUserId
  export const selectLoading = (state: RootStateWithUsers) => state.users.loading
  export const selectError = (state: RootStateWithUsers) => state.users.error
  
  // Селектор выбранного пользователя
  export const selectSelectedUser = (state: RootStateWithUsers) => {
    const { selectedUserId } = state.users
    return selectedUserId ? selectUserById(state, selectedUserId) : null
  }
  
  // Селектор отфильтрованных пользователей
  export const selectFilteredUsers = (state: RootStateWithUsers) => {
    const filter = state.users.filter.toLowerCase()
    const allUsers = selectAllUsers(state)
    
    if (!filter.trim()) return allUsers
    
    return allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(filter) ||
        user.email.toLowerCase().includes(filter) ||
        user.username.toLowerCase().includes(filter) ||
        user.company.name.toLowerCase().includes(filter)
    )
  }
  
  export const {
    setFilter,
    clearFilter,
    setSelectedUserId,
    clearSelectedUserId,
    setError,
    clearError,
    upsertUsers,
  } = usersSlice.actions
  
  export default usersSlice.reducer