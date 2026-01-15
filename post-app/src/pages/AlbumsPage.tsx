import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlbums } from '../shared/lib/hooks/useAlbums';
import AlbumCard from '../entities/ui/AlbumCard';

const AlbumsPage: React.FC = () => {
    const navigate = useNavigate()
    console.log({ navigate: navigate })
    const { albums, loading, error, getAlbums, getPhotosByAlbumId } = useAlbums()
    useEffect(() => {
        getAlbums()
    }, [getAlbums])

    const handleAlbumClick = (albumId: number) => {
        navigate(`/albums/${albumId}`)

    }
    const handleGoHome = () => {
        navigate('/');
    };
    const handleRefresh = () => {
        getAlbums();
    };
    if (loading) {
        return (
            <div>
                <div>Загрузка альбомов...</div>
            </div>
        );
    }
    if (error) {
        return (
            <div >
                <h2 >Ошибка загрузки</h2>
                <p >{error}</p>
                <div>
                    <button onClick={handleRefresh} >
                        Попробовать снова
                    </button>
                    <button onClick={handleGoHome} >
                        На главную
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div style={{display:'flex', flexDirection:'column', gap:'1.5rem'}}>
            <button
                style={{
                    marginTop:'1.5rem',
                    padding: '8px 16px',
                    width: '100%',
                    fontSize: '14px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                }}
                onClick={handleGoHome}>На главную</button>
            {albums.length === 0 ? (
                <div >
                    <div >📁</div>
                    <h3 >Альбомы не найдены</h3>

                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px,300px))',
                    gap: '3rem',
                }}>
                    {albums.map((album) => {
                        return (
                            <div key={album.id}>
                                <AlbumCard
                                    album={album}
                                    onAlbumClick={handleAlbumClick}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AlbumsPage;