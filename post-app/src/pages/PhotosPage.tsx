import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlbums } from '../shared/lib/hooks/useAlbums';
import PhotoCard from '../entities/ui/PhotoCard';

const PhotosPage: React.FC = () => {

    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const albumId = id ? parseInt(id) : null

    const { photos, loading, error, getAlbumById, getPhotosByAlbumId,} = useAlbums()

    useEffect(()=>{
        if(albumId) {
            getAlbumById(albumId)
            getPhotosByAlbumId(albumId)
        }
    },  [albumId, getAlbumById, getPhotosByAlbumId])

    console.log({photos:photos, albumId:albumId})

        // Обработчик возврата к альбомам
        const handleBackToAlbums = () => {
            navigate('/albums');
        };
    
        // Обработчик возврата на главную
        const handleGoHome = () => {
            navigate('/');
        };

        if (loading) {
            return (
                <div >
                    <div>Загрузка фотографий...</div>
                </div>
            );
        }
    return (
        <div >
        <h2 >Фотографии ({photos.length})</h2>
        
        {photos.length === 0 ? (
            <div >
                <div >📷</div>
                <h3 >В альбоме нет фотографий</h3>
                <p >
                    Этот альбом пока пуст
                </p>
                <button onClick={handleBackToAlbums}>к альбомам</button>
            </div>
        ) : (
            <div >
                {photos.map((photo) => (
                    <div key={photo.id} >
                        <PhotoCard
                            photo={photo}
                        />
                        <p >{photo.title}</p>
                    </div>
                ))}
            </div>
        )}
    </div>
    );
};

export default PhotosPage;