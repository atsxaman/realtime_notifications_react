import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import { posts } from './data';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000");

const App = () => {
    const [user, setUser] = useState('');
    const [username, setUserName] = useState('');
    const [notifications, setNotifications] = useState({});

    useEffect(() => {
        if (user) {
            socket.emit('reconnect_user', user);
        }

        socket.on('receive_notification', ({ username, count }) => {
            setNotifications(prevNotifications => ({
                ...prevNotifications,
                [username]: count
            }));
        });

        socket.on('clear_notifications', (username) => {
            setNotifications(prevNotifications => ({
                ...prevNotifications,
                [username]: 0
            }));
        });

        return () => {
            socket.off('receive_notification');
            socket.off('clear_notifications');
        };
    }, [user]);

    return (
        <>
            {user ? (
                <>
                    <Navbar 
                        user={user} 
                        notifications={notifications[user] || 0} 
                        onClearNotifications={() => socket.emit('clear_notifications', user)} 
                    />
                    <div className='w-full flex items-center justify-center flex-wrap md:gap-3 '>
                        {posts.map((post) => (
                            <Card key={post.id} post={post} user={user} socket={socket} />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className='shadow-xl shadow-gray-700 grid justify-center py-4 mt-32 w-[90%] md:w-[25%] m-auto'>
                        <h1 className='text-center font-bold text-2xl'>Login</h1>
                        <input
                            onChange={(e) => setUserName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setUser(username);
                                }
                            }}
                            className='p-2 my-4 border focus:outline-none' type='text' placeholder='enter username'
                        />
                        <button onClick={() => setUser(username)} className='bg-green-600 hover:bg-green-700 text-white py-1 font-semibold w-24 m-auto'>Login</button>
                    </div>
                </>
            )}
        </>
    );
};

export default App;
