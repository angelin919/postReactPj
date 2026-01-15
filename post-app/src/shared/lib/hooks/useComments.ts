import { useCallback } from "react"
import { selectError, selectLoading, selectAllComments, fetchComments, fetchCommentsByPostId, fetchCommentById } from "../../../entities/post/model/commentsSlice"
import { useAppDispatch } from "./useAppDispatch"
import { useAppSelector } from "./useAppSelector"

export const useComments = () => {
    const dispatch = useAppDispatch()
    const comments = useAppSelector(selectAllComments);
    const loading = useAppSelector(selectLoading)
    const error = useAppSelector(selectError)

    const getComments = useCallback(()=>dispatch(fetchComments()), [dispatch])
    const getCommentsByPostId = useCallback((postId:number)=> dispatch(fetchCommentsByPostId(postId)),[dispatch])
    const getCommentById = useCallback((id: number)=> dispatch(fetchCommentById(id)), [dispatch])

    return {
        comments,
        loading,
        error,

        getComments,
        getCommentsByPostId,
        getCommentById


    }
}