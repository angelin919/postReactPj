import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../../shared/layouts/MainLayout";
import PostsPage from "../../../pages/PostsPage";
import PostDetailsPage from "../../../pages/PostDetailsPage";
import AlbumPhotosPage from "../../../pages/AlbumPhotosPage";
import UserTodosPage from "../../../pages/UserTodosPage";
import UserPostsPage from "../../../pages/UserPostsPage";
import UserAlbumsPage from "../../../pages/UserAlbumsPage";



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


        ]
    },
    {
        path: 'users/:userId',
        children: [
            {
                path: 'albums',
                element: <UserAlbumsPage />,
            },
            {
                path: 'albums/:albumId/photos',
                element: <AlbumPhotosPage />,
            },
            {
                path: 'todos',
                element: <UserTodosPage />,
            },
            {
                path: 'posts',
                element: <UserPostsPage />,
            },
        ],

    }
])