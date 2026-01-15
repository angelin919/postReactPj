import { useCallback } from "react"
import { clearError, fetchUsers, selectAllUsers, selectError, selectLoading } from "../../../entities/post/model/usersSlice"
import { useAppDispatch } from "./useAppDispatch"
import { useAppSelector } from "./useAppSelector"

const useUser = () => {
    const dispatch = useAppDispatch()
    const users = useAppSelector(selectAllUsers)
    const loading = useAppSelector(selectLoading)
    const error = useAppSelector(selectError)

    const getUsersHandler = useCallback(
        () => {
          dispatch(fetchUsers())
        },
        [dispatch]
      )

      const clearErrorValue = useCallback(
        () => {
          dispatch(clearError())
        },
        [dispatch]
      )

    return{
        users,
        loading,
        error,
        getUsers: getUsersHandler,
        clearErrorValue,



    }
}
export default useUser
