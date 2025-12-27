import React, { ComponentType } from 'react'

interface WithLoadingProps {
  isLoading: boolean
  loadingText?: string
}

function withLoading<P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P & WithLoadingProps> {
  const WithLoading: React.FC<P & WithLoadingProps> = ({
    isLoading,
    loadingText = 'Загрузка...',
    ...props
  }) => {
    if (isLoading) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
          gap: '1rem',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #e5e7eb',
            borderTopColor: '#3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          <p style={{ color: '#6b7280' }}>{loadingText}</p>
        </div>
      )
    }

    return <WrappedComponent {...props as P} />
  }

  WithLoading.displayName = `WithLoading(${WrappedComponent.displayName || WrappedComponent.name})`

  return WithLoading
}

export default withLoading
