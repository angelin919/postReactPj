import React from 'react';
import { Link } from 'react-router-dom';

const UserAlbumsPage = () => {
    return (
        <div>
            <h1>Здесь Альбомы</h1>
            <Link to='/posts'>На главную</Link>
        </div>
    );
};

export default UserAlbumsPage;