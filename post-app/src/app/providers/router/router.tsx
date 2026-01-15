import { lazy, Suspense } from 'react';

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../../shared/layouts/MainLayout";
import PostsPage from "../../../pages/PostsPage";
import PostDetailsPage from "../../../pages/PostDetailsPage";
// import UserTodosPage from "../../../pages/UserTodosPage";
import UserPostsPage from "../../../pages/UserPostsPage";
import UsersPage from '../../../pages/UsersPage';
import TodoPage from '../../../pages/TodoPage';
// import UserAlbumsPage from "../../../pages/UserAlbumsPage";
// import AlbumPhotosPage from "../../../pages/AlbumPhotosPage";

const AlbumsPage = lazy(() => import('../../../pages/AlbumsPage'));
const PhotosPage = lazy(() => import('../../../pages/PhotosPage'));
const UserTodosPage = lazy(() => import('../../../pages/UserTodosPage'));
const UserAlbumsPage = lazy(() => import('../../../pages/UserAlbumsPage'));
const AlbumPhotosPage = lazy(() => import('../../../pages/AlbumPhotosPage'));




const Loader = () => (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
    }}>
        <div>Загрузка...</div>
    </div>
)


export const router = createBrowserRouter([
    {
        path: '/',
        element: < MainLayout />,
        children: [
            {
                index: true,
                element: <PostsPage />
            },
            {
                path: 'posts',
                children: [
                    {
                        index: true,
                        element: <PostsPage />
                    },            {
                        path: ':id',
                        element: <PostDetailsPage />,
                    }
                ]

            },
            {
                path: 'albums',
                element: (
                    <Suspense fallback={<Loader />}>
                        <AlbumsPage />
                    </Suspense>
                ),
            },
            {
                path: 'albums/:albumId',
                element: (
                    <Suspense fallback={<Loader />}>
                        <PhotosPage />
                    </Suspense>
                ),
            },
            {
                path: 'users',
                element: <UsersPage />
                ,
            },


        ]
    },
    {
        path: 'users/:userId',
        children: [
            {
                path: 'albums',
                element: (
                    <Suspense fallback={<Loader />}>
                        <UserAlbumsPage />
                    </Suspense>
                ),
            },
            {
                path: 'albums/:albumId/photos',
                element: (
                    <Suspense fallback={<Loader />}>
                        <AlbumPhotosPage />
                    </Suspense>
                ),
            },
            {
                path: 'todos',
                element: (
                    <Suspense fallback={<Loader />}>
                        <UserTodosPage />
                    </Suspense>
                ),
            },
            {
                path: 'posts',
                element: <UserPostsPage />,
            },
        ],

    },
    {
        path: 'todos',
        children: [
          {
            index: true,
            element: <TodoPage />,
          },
        ]
        }


])