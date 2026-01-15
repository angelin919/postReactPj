import React, { useState, useEffect, useCallback } from 'react'
import useUser from '../../shared/lib/hooks/useUser'
import UserCard from '../../entities/ui/userCard'
import './UserList.css'

const UserList: React.FC = () => {
    const [localSearch, setLocalSearch] = useState('')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

    const {
        users,
        loading,
        error,
        getUsers,
        clearErrorValue


    } = useUser()

    // Загружаем пользователей при монтировании
    useEffect(() => {
        getUsers()
    }, [getUsers])



    const handleRetry = useCallback(() => {
        clearErrorValue()
        getUsers()
    }, [clearErrorValue, getUsers])

    const toggleViewMode = useCallback(() => {
        setViewMode(prev => prev === 'grid' ? 'list' : 'grid')
    }, [])

    console.log({ users: users })



    if (error) {
        return (
            <div className="user-list-error">
                <div className="error-message">
                    <h3>❌ Error loading users</h3>
                    <p>{error}</p>
                    <button onClick={handleRetry} className="retry-button">
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    if (loading && users.length === 0) {
        return (
            <div className="user-list-loading">
                <div className="loading-spinner"></div>
                <p>Loading users...</p>
            </div>
        )
    }

    return (
        <div className="user-list-container">
            {
                users.map(user => {
                    return <UserCard user={user} />
                }
                )
            }

        </div>
    )
}

export default UserList