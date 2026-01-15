import React, { useState } from 'react';
import Button from '../../shared/ui/Button';
import './Header.css'
import ThemeSwitcher from '../../features/themeSwitcher/ui/ThemeSwitcher';
import Modal from '../../shared/ui/modal/Modal';
import UserTabs from '../UserTabs/UserTabs';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }
    return (
        <>
            <header style={{

                background: '#333',
                color: '#fff',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'nowrap',
                gap: '1rem'

            }}>
                <h1 style={{
                    flexShrink: '0',
                    margin: '0',
                }}>Post App</h1>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1rem'
                }}>
                    <Button onClick={handleOpenModal}>О проекте</Button>

                        <Button><NavLink style={{textDecoration:'none', color:'#fff'}}to={`/albums`}>Альбомы</NavLink></Button>                    
                        <Button><NavLink style={{textDecoration:'none', color:'#fff'}}to={`/users`}>Пользователи</NavLink></Button>
                        <Button><NavLink style={{textDecoration:'none', color:'#fff'}}to={`/todos`}>ToDos</NavLink></Button>

                    <ThemeSwitcher />
                    <aside style={{
                        width: '250px',
                        flexShrink: 0
                    }}>
                        <UserTabs />
                    </aside>
                </div>

            </header>
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            >
                <Modal.Header>
                    О проекте
                </Modal.Header>
                <Modal.Body>
                    <div style={{ lineHeight: 1.6 }}>
                        <p style={{ marginBottom: '1rem' }}>
                            Это приложение для управления постами с функциями:
                        </p>

                        <ul style={{
                            marginBottom: '1.5rem',
                            paddingLeft: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            // listStyle:'none',
                            alignItems: 'start'
                        }}>
                            <li>Создание постов</li>
                            <li> Просмотр постов</li>
                            <li> Редактирование постов</li>
                            <li> Удаление постов</li>
                            <li> Переключение темы</li>
                        </ul>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        onClick={() => { handleCloseModal() }}
                    >закрыть</button>
                </Modal.Footer>

            </Modal>
            {/* <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="О проекте"
            >
                <div style={{ lineHeight: 1.6 }}>
                    <p style={{ marginBottom: '1rem' }}>
                        Это приложение для управления постами с функциями:
                    </p>

                    <ul style={{
                        marginBottom: '1.5rem',
                        paddingLeft: '1.5rem',
                        display:'flex',
                        flexDirection:'column',
                        // listStyle:'none',
                        alignItems:'start'
                    }}>
                        <li>Создание постов</li>
                        <li> Просмотр постов</li>
                        <li> Редактирование постов</li>
                        <li> Удаление постов</li>
                        <li> Переключение темы</li>
                    </ul>

                </div>
            </Modal> */}
        </>


    );
};

export default Header;