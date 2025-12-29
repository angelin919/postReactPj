import React from 'react';
import Header from '../../widgets/LayoutHeader/Header';
import Footer from '../../widgets/LayoutFooter/Footer';
import UserTabs from '../../widgets/UserTabs/UserTabs';
import { Outlet } from 'react-router-dom';

interface MainLayoutprops {
    children?: React.ReactNode
}

const MainLayout: React.FC<MainLayoutprops> = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            maxWidth: '1024px',
            margin: '0 auto',
            width: '100%'
        }}>
            <Header />

            <main style={{ flex: 1 }}>
                <Outlet /> 
            </main>
            <Footer />

        </div>
    );
};

export default MainLayout;