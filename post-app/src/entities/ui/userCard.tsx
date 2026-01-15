import React from 'react'
import { User } from '../../shared/types/user'

interface UserCardProps {
  user: User
  onClick?: (userId: number) => void
  isSelected?: boolean
  compact?: boolean
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onClick, 
  isSelected = false,
  compact = false 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(user.id)
    }
  }

  if (compact) {
    return (
      <div 
      style={{
        background: 'white',
        borderRadius: '10px',
        padding: '20px',
        margin: '10px 0'

      }}
      
      onClick={handleClick}
      >
        <div className="user-card-compact-header">
          <h4 className="user-name">{user.name}</h4>
          <span className="user-username">@{user.username}</span>
        </div>
        <p className="user-email">{user.email}</p>
        <div className="user-company">
          <span className="company-name">{user.company.name}</span>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`user-card ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <div className="user-card-header">
        <h3 className="user-name">{user.name}</h3>
        <span className="user-username">@{user.username}</span>
      </div>
      
      <div className="user-card-body">
        <div className="user-contact">
          <p className="user-email">
            <span className="icon">📧</span>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </p>
          <p className="user-phone">
            <span className="icon">📱</span>
            {user.phone}
          </p>
        </div>
        
        <div className="user-company">
          <h4>Company</h4>
          <p className="company-name"><strong>{user.company.name}</strong></p>
          <p className="company-catchphrase">{user.company.catchPhrase}</p>
        </div>
        
        <div className="user-address">
          <h4>Address</h4>
          <p>{user.address.street}, {user.address.suite}</p>
          <p>{user.address.city}, {user.address.zipcode}</p>
        </div>
        
        <div className="user-website">
          <span className="icon">🌐</span>
          <a 
            href={`https://${user.website}`} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            {user.website}
          </a>
        </div>
      </div>
      
      <div className="user-card-footer">
        <span className="user-id">ID: {user.id}</span>
        {isSelected && <span className="selected-badge">Selected</span>}
      </div>
    </div>
  )
}

export default UserCard