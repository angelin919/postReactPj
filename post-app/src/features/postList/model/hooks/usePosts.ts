import { useState, useEffect, useCallback } from 'react'
import { Post } from '../../../../entities/ui/PostCard'
import { Comment } from '../../../../widgets/CommentList/CommentList'
import { getAllPosts, getPostById, getPostsByUserId } from '../../../../shared/data/posts'
import { getAllComments, getCommentsByPostId } from '../../../../shared/data/comments'


interface UsePostsOptions {
    userId?: number
    postId?: number
    withComments?: boolean
    enabled?: boolean
}

interface UsePostsResult {
    posts: Post[]
    post: Post | null
    comments: Comment[]
    isLoading: boolean
    isError: boolean
    error: string | null
    refetch: () => Promise<void>
    fetchPostById: (id: number) => Promise<Post | undefined>
    fetchCommentsByPostId: (id: number) => Promise<Comment[]>

}

export const usePosts = (options: UsePostsOptions = {}): UsePostsResult => {
    console.log('usePosts called', options)

    const { userId, postId, withComments = false, enabled = true } = options

    const [posts, setPosts] = useState<Post[]>([])
    const [post, setPost] = useState<Post | null>(null)
    const [comments, setComments] = useState<Comment[]>([])


    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchData = useCallback(async () => {

        try {
            setIsLoading(true)
            setIsError(false)
            setError(null)

            let postsData: Post[] = []

            if (postId) {
                const postData = await getPostById(postId)
                if (postData) {
                    setPost(postData)
                    postsData = [postData]
                }

            } else if (userId) {
                postsData = await getPostsByUserId(userId)
                setPosts(postsData)
            } else {
                postsData = await getAllPosts()
                setPosts(postsData)
                console.log('posts called', posts)

            }

            if (withComments && postsData.length > 0) {
                const allComments = await getAllComments()
                setComments(allComments)
            }

        } catch (err) {
            setIsError(true)
            console.error('Error fetching data: ', err)
        } finally {
            setIsLoading(false)
        }
    }, [userId, postId, withComments, enabled])
    const refetch = useCallback(async () => {
        await fetchData()
    }, [fetchData])

    const fetchPostById = useCallback(async (id: number): Promise<Post | undefined> => {
        try {
            return await getPostById(id)
        } catch (err) {
            console.error('Error fetching post:', err)
            return undefined
        }
    }, [])

    const fetchCommentsByPostId = useCallback(async (id: number): Promise<Comment[]> => {
        try {
            return await getCommentsByPostId(id)
        } catch (err) {
            console.error('Error fetching comments:', err)
            return []
        }
    }, [])


    useEffect(() => {
        fetchData()
    }, [fetchData])


    return {
        posts,
        post,
        comments,

        isLoading,
        isError,
        error,

        refetch,
        fetchPostById,
        fetchCommentsByPostId

    }
}