import { Album, Photo } from "../types/album";

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export class AlbumsApi {

    async getAlbums():Promise<Album[]>{
        return this.request<Album[]>('/albums')
    }

    async getAlbumById(id:number): Promise<Album>{
        return this.request<Album>(`/albums/${id}`)
    }

    async getAlbumsByUserId(userId:number): Promise<Album[]>{
        return this.request<Album[]>(`/albums?userId=${userId}`)
    }

    //PHOTO
    async getPhotos(): Promise<Photo[]>{
        return this.request<Photo[]>('/photos')
    }
    async getPhotoById(id:number): Promise<Photo>{
        return this.request<Photo>(`/photos/${id}`)
    }
    async getPhotosByAlbumId(albumId: number):Promise<Photo[]>{
        return this.request<Photo[]>(`/photos?albumId=${albumId}`)

    }
    private async request<T>(endpoint:string, options?: RequestInit): Promise<T>{
        const url = `${BASE_URL}${endpoint}`
        console.log(`Albums Api request: ${url}`)
        try{
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...options?.headers
                }
            })

            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json()
            console.log(`Albums API ответ получен: ${endpoint}`, data);

            return data as T
        }catch(error){
            console.error(`Ошибка запроса Albums API ${endpoint}:`, error)
            throw error;

        }
    }

}

export const albumsApi = new AlbumsApi()