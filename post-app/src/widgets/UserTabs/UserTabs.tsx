import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllUsers } from '../../shared/data/users';
interface User {
    id: number
    name: string
}
const UserTabs = () => {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers()
                setUsers(response) 
            } catch (error) {
                console.error('Error fetching users:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])
    return (
        <nav style={{
            position: 'absolute',
            top: '5%',
            right: '5%',
            justifyContent:'space-between',
            background: '#f9fafb',
            borderRadius: '0.5rem',
            padding: '0.5rem',
            border: '1px solid #e5e7eb'
        }}>
            <div style={{
                padding: '0.75rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                borderBottom: '1px solid #e5e7eb'
            }}>
                Пользователи
            </div>

            {users.map(user => (
                <div key={user.id} style={{ marginBottom: '0.5rem' }}>
                    <div style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#6b7280',
                        marginTop: '0.5rem'
                    }}>
                        {user.name}
                    </div>

                    <div style={{ marginLeft: '0.5rem' }}>
                        <NavLink
                            to={`/users/${user.id}/posts`}
                        // style={navLinkStyles}
                        >
                            Посты
                        </NavLink>

                        <NavLink
                            to={`/users/${user.id}/albums`}
                        // style={navLinkStyles}
                        >
                            Альбомы
                        </NavLink>

                        <NavLink
                            to={`/users/${user.id}/todos`}
                        // style={navLinkStyles}
                        >
                            Задачи
                        </NavLink>
                    </div>
                </div>
            ))}

            <div style={{
                marginTop: '1rem',
                padding: '0.75rem 1rem',
                borderTop: '1px solid #e5e7eb'
            }}>
                <NavLink
                    to="/posts"
                // style={navLinkStyles}
                >
                    Все посты
                </NavLink>
            </div>
        </nav>
    );
};

export default UserTabs;