import React from 'react';
import { LengthFilter, getFilterLabel } from '../lib/filterByLength';

interface PostLenghtFilterProps{
    currentFilter: LengthFilter
    onFilterChange: (filter:LengthFilter)=> void
}

const PostLenghtFilter:React.FC<PostLenghtFilterProps> = ({currentFilter, onFilterChange}) => {
    const filters:LengthFilter[] = ['all', 'short', 'medium', 'long']
    return (
        <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          marginBottom: '0.5rem' 
        }}>
          <span style={{ fontWeight: 500 }}>Фильтр по длине заголовка:</span>
          <span style={{ 
            backgroundColor: '#3b82f6', 
            color: 'white',
            padding: '0.125rem 0.5rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
          }}>
            {getFilterLabel(currentFilter)}
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: currentFilter === filter ? '#3b82f6' : '#f3f4f6',
                color: currentFilter === filter ? 'white' : '#374151',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'all 0.2s',
              }}
            >
              {getFilterLabel(filter)}
            </button>
          ))}
        </div>
      </div>
    );
};

export default PostLenghtFilter;