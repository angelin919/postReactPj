import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { albumsApi } from '../../../shared/api/albumsApi';
import { Album, Photo } from '../../../shared/types/album';

interface AlbumsState {
    albums: Album[],
    selectedAlbum: Album | null,
    photos: Photo[],
    selectedPhoto: Photo | null,
    loading: boolean,
    error: string | null,
    userIdFilter: number | null; // Фильтр по userId
    albumIdFilter: number | null; // Фильтр по albumId (для фото)
}

const initialState: AlbumsState = {
    albums: [],
    selectedAlbum: null,
    photos: [],
    selectedPhoto: null,
    loading: false,
    error: null,
    userIdFilter: null,
    albumIdFilter: null
}

export const fetchAlbums = createAsyncThunk<Album[], void>(
    'albums/fetchAlbums',
    async (_, { rejectWithValue }) => {
        try {
            console.log('Загружаем альбомы...');
            const albums = await albumsApi.getAlbums();
            console.log(`Загружено ${albums.length} альбомов`);
            return albums
        } catch (error: any) {
            console.error('❌ Ошибка загрузки альбомов:', error);
            return rejectWithValue(error.message);
        }
    }
)

export const fetchAlbumById = createAsyncThunk(
    'albums/fetchAlbumById',
    async (id: number, { rejectWithValue }) => {
        try {
            console.log(`Загружаем альбом ${id}...`);
            const album = await albumsApi.getAlbumById(id);
            console.log(`Альбом ${id} загружен`);
            return album;
        } catch (error: any) {
            console.error(`❌ Ошибка загрузки альбома ${id}:`, error);
            return rejectWithValue(error.message);
        }
    }
);

export const fetchAlbumsByUserId = createAsyncThunk(
    'albums/fetchAlbumsByUserId',
    async (userId: number, { rejectWithValue }) => {
        try {
            console.log(`Загружаем альбомы пользователя ${userId}...`);
            const albums = await albumsApi.getAlbumsByUserId(userId);
            console.log(`Загружено ${albums.length} альбомов пользователя ${userId}`);
            return albums;
        } catch (error: any) {
            console.error(`❌ Ошибка загрузки альбомов пользователя ${userId}:`, error);
            return rejectWithValue(error.message);
        }
    }
);

//PHOTO
export const fetchPhotos = createAsyncThunk(
    'albums/fetchPhotos',
    async (_, { rejectWithValue }) => {
        try {
            console.log('📡 Загружаем фотографии...');
            const photos = await albumsApi.getPhotos();
            console.log(`✅ Загружено ${photos.length} фотографий`);
            return photos;
        } catch (error: any) {
            console.error('❌ Ошибка загрузки фотографий:', error);
            return rejectWithValue(error.message);
        }
    }
);

export const fetchPhotosByAlbumId = createAsyncThunk(
    'albums/fetchPhotosByAlbumId',
    async (albumId: number, { rejectWithValue }) => {
        try {
            console.log(`Загружаем фотографии альбома ${albumId}...`);
            const photos = await albumsApi.getPhotosByAlbumId(albumId);
            console.log(`Загружено ${photos.length} фотографий альбома ${albumId}`);
            return photos;
        } catch (error: any) {
            console.error(`❌ Ошибка загрузки фотографий альбома ${albumId}:`, error);
            return rejectWithValue(error.message);
        }
    }
);

export const fetchPhotoById = createAsyncThunk(
    'albums/fetchPhotoById',
    async (id: number, { rejectWithValue }) => {
        try {
            console.log(`Загружаем фотографию ${id}...`);
            const photo = await albumsApi.getPhotoById(id);
            console.log(`Фотография ${id} загружена`);
            return photo;
        } catch (error: any) {
            console.error(`❌ Ошибка загрузки фотографии ${id}:`, error);
            return rejectWithValue(error.message);
        }
    }
);

const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {
        // Синхронные редьюсеры
        setUserIdFilter: (state, action: PayloadAction<number | null>) => {
            state.userIdFilter = action.payload;
        },
        setAlbumIdFilter: (state, action: PayloadAction<number | null>) => {
            state.albumIdFilter = action.payload;
        },
        clearFilters: (state) => {
            state.userIdFilter = null;
            state.albumIdFilter = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearSelectedAlbum: (state) => {
            state.selectedAlbum = null;
        },
        clearSelectedPhoto: (state) => {
            state.selectedPhoto = null;
        },
        clearPhotos: (state) => {
            state.photos = [];
        },
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchAlbums.pending, (state) => {
                console.log('⏳ fetchAlbums PENDING');
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAlbums.fulfilled, (state, action) => {
                console.log('✅ fetchAlbums FULFILLED');
                state.loading = false;
                state.albums = action.payload ;
            })
            .addCase(fetchAlbums.rejected, (state, action) => {
                console.log('❌ fetchAlbums REJECTED:', action.payload);
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAlbumById.pending, (state) => {
                console.log('⏳ fetchAlbumById PENDING');
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAlbumById.fulfilled, (state, action) => {
                console.log('✅ fetchAlbumById FULFILLED');
                state.loading = false;
                state.selectedAlbum = action.payload;
            })
            .addCase(fetchAlbumById.rejected, (state, action) => {
                console.log('❌ fetchAlbumById REJECTED:', action.payload);
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAlbumsByUserId.pending, (state) => {
                console.log('⏳ fetchAlbumsByUserId PENDING');
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAlbumsByUserId.fulfilled, (state, action) => {
                console.log('✅ fetchAlbumsByUserId FULFILLED');
                state.loading = false;
                state.albums = action.payload;
                state.userIdFilter = action.payload[0]?.userId || null;
            })
            .addCase(fetchAlbumsByUserId.rejected, (state, action) => {
                console.log('❌ fetchAlbumsByUserId REJECTED:', action.payload);
                state.loading = false;
                state.error = action.payload as string;
            })

            //PHOTO
            .addCase(fetchPhotos.pending, (state) => {
                console.log('⏳ fetchPhotos PENDING');
                state.loading = true;
            })
            .addCase(fetchPhotos.fulfilled, (state, action) => {
                console.log('✅ fetchPhotos FULFILLED');
                state.loading = false;
                state.photos = action.payload;
            })
            .addCase(fetchPhotos.rejected, (state, action) => {
                console.log('❌ fetchPhotos REJECTED:', action.payload);
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchPhotosByAlbumId.pending, (state) => {
                console.log('⏳ fetchPhotosByAlbumId PENDING');
                state.loading = true;
            })
            .addCase(fetchPhotosByAlbumId.fulfilled, (state, action) => {
                console.log('✅ fetchPhotosByAlbumId FULFILLED');
                state.loading = false;
                state.photos = action.payload;
                state.albumIdFilter = action.payload[0]?.albumId || null;
            })
            .addCase(fetchPhotosByAlbumId.rejected, (state, action) => {
                console.log('❌ fetchPhotosByAlbumId REJECTED:', action.payload);
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchPhotoById.pending, (state) => {
                console.log('⏳ fetchPhotoById PENDING');
                state.loading = true;
            })
            .addCase(fetchPhotoById.fulfilled, (state, action) => {
                console.log('✅ fetchPhotoById FULFILLED');
                state.loading = false;
                state.selectedPhoto = action.payload;
            })
            .addCase(fetchPhotoById.rejected, (state, action) => {
                console.log('❌ fetchPhotoById REJECTED:', action.payload);
                state.loading = false;
                state.error = action.payload as string;
            });


    }
})

export const { clearError, clearPhotos } = albumsSlice.actions

export const selectAllAlbums = (state: { albums?: AlbumsState }) =>
    state.albums?.albums || []

export const selectAlbumsById = (state: { albums?: AlbumsState }, id: number) =>
    state.albums?.albums?.find(album => album.id == id) || null

export const selectAlbumsByUserId = (state: { albums?: AlbumsState }, userId: number) =>
    state.albums?.albums?.filter(album => album.userId == userId) || null
export const selectAllPhotos = (state: { albums?: AlbumsState }) =>
    state.albums?.photos || [];

export const selectPhotoById = (state: { albums?: AlbumsState }, id: number) =>
    state.albums?.photos?.find(photo => photo.id === id) || null;

export const selectPhotosByAlbumId = (state: { albums?: AlbumsState }, albumId: number) =>
    state.albums?.photos?.filter(photo => photo.albumId === albumId) || [];
export const selectLoading = (state: { albums?: AlbumsState }) =>
    state.albums?.loading || false;

export const selectError = (state: { albums?: AlbumsState }) =>
    state.albums?.error || null;

export default albumsSlice.reducer;
