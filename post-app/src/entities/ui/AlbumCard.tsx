import React from 'react';
import { Album } from '../../shared/types/album';

interface AlbumCardProps {
    album: Album
    onAlbumClick?: (albumId: number) => void;

}
const AlbumCard: React.FC<AlbumCardProps> = ({ album, onAlbumClick }) => {
    const handleClick = () => {
        if(onAlbumClick){
            onAlbumClick(album.id)
        }
    }
    return (
        <div 
            onClick={handleClick}
            style={{
                border: '1px solid #e5e7eb',
                borderRadius: '10px',
                padding: '20px',
                backgroundColor: 'white',
                cursor: onAlbumClick ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column' as const,
                ...(onAlbumClick && {
                    ':hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        borderColor: '#3b82f6',
                    }
                })
            }}
        >
            {/* Иконка альбома */}
            <div style={{
                fontSize: '32px',
                marginBottom: '15px',
                color: '#3b82f6',
                textAlign: 'center' as const,
            }}>
                📁
            </div>
            
            {/* Заголовок */}
            <h3 style={{ 
                margin: '0 0 15px 0', 
                fontSize: '16px',
                fontWeight: 600 as const,
                color: '#1f2937',
                lineHeight: '1.4',
                flex: '1',
            }}>
                {album.title}
            </h3>
            
            {/* Информация */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 'auto',
                fontSize: '13px',
                color: '#6b7280',
                paddingTop: '15px',
                borderTop: '1px solid #f3f4f6',
            }}>
                <div>
                    <div style={{ marginBottom: '3px' }}>User: {album.userId}</div>
                    <div>ID: {album.id}</div>
                </div>
                
            </div>
            
            {/* Кнопка просмотра */}
            {onAlbumClick && (
                <div style={{ 
                    marginTop: '15px',
                    textAlign: 'center' as const,
                }}>
                    <button
                        style={{
                            padding: '8px 16px',
                            width: '100%',
                            fontSize: '14px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 500 as const,
                            transition: 'background-color 0.2s',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                    >
                        Открыть альбом
                    </button>
                </div>
            )}
        </div>
    );
};

export default AlbumCard;