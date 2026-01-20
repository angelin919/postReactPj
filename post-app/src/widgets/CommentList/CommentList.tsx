import React, { memo, useCallback, useState } from 'react';
import { Comment } from '../../shared/types/comment';

interface CommentListprops {
    comments: Comment[]
    postId: number
}

const CommentList: React.FC<CommentListprops> = memo(({ comments, postId }) => {
    const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set())
    const toggleComment = useCallback((commentId: number) => {
        setExpandedComments(prev => {
            const next = new Set(prev)
            if (next.has(commentId)) {
                next.delete(commentId)
            } else {
                next.add(commentId)
            }
            return next
        })
    }, [])

    const toggleAllComments = useCallback(() => {
        if (expandedComments.size === comments.length) {
            setExpandedComments(new Set())
        } else {
            setExpandedComments(new Set(comments.map(c => c.id)))
        }
    }, [comments, expandedComments.size])
    const postComments = comments.filter(comment => comment.postId === postId)
    if (postComments.length === 0) {
        return (
            <div style={{ marginTop: '1rem', color: '#6b7280' }}>
                Нет комментариев
            </div>
        )
    }
    return ( 
        <div style={{ marginTop: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
            }}>
                <h3 style={{ margin: 0, fontSize: '1.125rem' }}>
                    Комментарии ({postComments.length})
                </h3>
                <button
                    onClick={toggleAllComments}
                    style={{
                        padding: '0.375rem 0.75rem',
                        fontSize: '0.875rem',
                        // backgroundColor: '#f3f4f6',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                    }}
                >
                    {expandedComments.size === postComments.length ? 'Свернуть все' : 'Развернуть все'}
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {postComments.map(comment => {
                    const isExpanded = expandedComments.has(comment.id)

                    return (
                        <div
                            key={comment.id}
                            style={{
                                border: '1px solid #e5e7eb',
                                borderRadius: '0.5rem',
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                onClick={() => toggleComment(comment.id)}
                                style={{
                                    padding: '1rem',
                                    // backgroundColor: '#f9fafb',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div>
                                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                                        {comment.name}
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                        {comment.email}
                                    </div>
                                </div>
                                <span style={{ fontSize: '1.25rem' }}>
                                    {isExpanded ? '−' : '+'}
                                </span>
                            </div>

                            {isExpanded && (
                                <div style={{ padding: '1rem' }}>
                                    <p style={{ margin: 0, lineHeight: 1.6 }}>
                                        {comment.body}
                                    </p>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
});

export default CommentList;