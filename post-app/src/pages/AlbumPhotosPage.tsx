import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
interface Photo {
    id: string
    albumId: string
    title: string
    url: string

}
const AlbumPhotosPage = () => {
    const { userId, albumId } = useParams<{ userId: string; albumId: string }>()
    const [photos, setPhotos] = useState<Photo[]>([])
    const [loading, setLoading] = useState(true)
    console.log({userId:userId, albumId:albumId})
    useEffect(()=>{
        setPhotos([{id:'1', albumId:'1', title:'title', url:'./'},
    ])
    setLoading(false)

    },[])
    return (
        <div>
            <h1>Здесь Альбом и только</h1>
            <Link to='/posts'>На главную</Link>
        </div>
    );
};

export default AlbumPhotosPage;

