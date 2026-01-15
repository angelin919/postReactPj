import { useCallback } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { fetchAlbumById, fetchAlbums, fetchAlbumsByUserId, fetchPhotoById, fetchPhotos, fetchPhotosByAlbumId, selectAllAlbums, selectAllPhotos, selectError, selectLoading } from '../../../entities/post/model/albumsSlice';

export const useAlbums = () => {
    const dispatch = useAppDispatch()

    const albums = useAppSelector(selectAllAlbums)
    const photos = useAppSelector(selectAllPhotos)
    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);

    const getAlbums = useCallback(()=> dispatch(fetchAlbums()), [dispatch])
    const getAlbumById = useCallback(
        (id: number) => dispatch(fetchAlbumById(id)), 
        [dispatch]
    );
    const getAlbumsByUserId = useCallback(
        (userId: number) => dispatch(fetchAlbumsByUserId(userId)), 
        [dispatch]
    );

        // Actions для фотографий
        const getPhotos = useCallback(() => dispatch(fetchPhotos()), [dispatch]);
        const getPhotosByAlbumId = useCallback(
            (albumId: number) => dispatch(fetchPhotosByAlbumId(albumId)), 
            [dispatch]
        );
        const getPhotoById = useCallback(
            (id: number) => dispatch(fetchPhotoById(id)), 
            [dispatch]
        );

return {
    albums, 
    photos,
    loading,
    error,

    getAlbums,
    getAlbumById,
    getAlbumsByUserId,

    getPhotos,
    getPhotosByAlbumId,
    getPhotoById


}

}