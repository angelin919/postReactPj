import React, { useCallback } from 'react';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '../../../../shared/lib/hooks/useAppSelector';
import { fetchPosts, selectAllPosts, selectComments, selectError, selectFilter, selectFilteredPosts, selectLoading, setFilter } from '../../../../entities/post/model/postsSlice';
const usePostsTwo = () => {
    const dispatch = useAppDispatch()
    const posts = useAppSelector(selectAllPosts)
    const filteredPosts = useAppSelector(selectFilteredPosts)
    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);
    const filter = useAppSelector(selectFilter);
    const comments = useAppSelector(selectComments)

    //Actions
    const getPosts = useCallback(() => dispatch(fetchPosts()), [dispatch])
    const setFilterValue = useCallback(
        (value: string) => dispatch(setFilter(value)), [dispatch])

    return {
        posts,
        filteredPosts,
        loading,
        error,
        comments,

        getPosts,
        setFilter: setFilterValue
    }
};

export default usePostsTwo;