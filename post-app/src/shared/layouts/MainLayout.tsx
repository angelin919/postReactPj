import React from 'react';
import Header from '../../widgets/LayoutHeader/Header';
import Footer from '../../widgets/LayoutFooter/Footer';

interface MainLayoutprops {
    children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutprops> = ({ children }) => {
    return (
        <div style={{
             display: 'flex', 
             flexDirection: 'column',
              minHeight: '100vh',
              maxWidth: '1024px',
              margin: '0 auto',
              width: '100%' }}>
            <Header />
            <main style={{ flex: 1, padding: '1rem' }}>
                {children}
            </main>
            <Footer />

        </div>
    );
};

export default MainLayout;