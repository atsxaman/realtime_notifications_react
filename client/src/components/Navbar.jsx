import React from 'react';
import { IoMdNotificationsOutline } from "react-icons/io";
import { TiMessage } from "react-icons/ti";
import { IoMdSettings } from "react-icons/io";

const Navbar = ({ user, notifications, onClearNotifications }) => {
    const handleLogout = () => {
        if (window.confirm(`logout ${user}`)) {
            window.location.reload();
        }
    };

    return (
        <>
            <nav className='bg-slate-200 flex items-center px-4 py-2 sticky top-0'>
                <span className='font-semibold'>{user}</span>
                <span className='m-auto font-bold'>BLOG⚡APP</span>
                <div className='flex items-center gap-10'>
                    <div className='flex items-center gap-5 text-2xl'>
                        <span className='relative' onClick={onClearNotifications}>
                            <span><IoMdNotificationsOutline /></span>
                            {notifications > 0 && (
                                <span className='absolute bg-red-600 w-5 h-5 text-center rounded-full text-sm font-semibold bottom-3 left-3 text-white'>
                                    {notifications}
                                </span>
                            )}
                        </span>
                        <span className='relative'>
                            <span><TiMessage /></span>
                        </span>
                        <span className='relative'>
                            <span><IoMdSettings /></span>
                        </span>
                    </div>
                    <button onClick={handleLogout} className='bg-green-600 hover:bg-green-700 text-white p-1'>Logout</button>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
