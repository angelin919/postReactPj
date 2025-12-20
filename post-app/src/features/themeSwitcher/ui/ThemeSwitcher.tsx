import React from 'react';
import useTheme from '../../../shared/lib/theme/useTheme';

const ThemeSwitcher = () => {
    const {theme, toggleTheme} = useTheme()
    return (
        <button
        onClick={toggleTheme}
        style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: theme === 'light' ? '#f3f4f6' : '#374151',
            color: theme === 'light' ? '#111827' : '#f9fafb',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease'
        
          }}
        >
            {
                theme == 'light' ? (
                    <>
                    <span></span>
                    <span>Темная</span>
                    </>
                ) : (
                    <>
                    <span></span>
                    <span>Светлая</span>
                    </>
                )
            }

        </button>
    );
};

export default ThemeSwitcher;