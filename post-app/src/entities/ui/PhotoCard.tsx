import React from 'react';
import { Photo } from '../../shared/types/album';

interface PhotoCardProps {
    photo: Photo;
}
const PhotoCard: React.FC<PhotoCardProps> = ({photo}) => {
    return (
        <div>
                        <div style={{ 
                position: 'relative' as const, 
                paddingTop: '100%', // Квадратное соотношение
                backgroundColor: '#f9fafb',
                overflow: 'hidden',
            }}>
                <img
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    style={{
                        position: 'absolute' as const,
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
            </div>
        </div>
    );
};

export default PhotoCard;