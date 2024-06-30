import React, { useEffect, useState } from 'react';
import { IoMdNotificationsOutline } from "react-icons/io";
import { TiMessage } from "react-icons/ti";
import { IoMdSettings } from "react-icons/io";


const Navbar = ({ user, socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm(`logout ${user}`)) {
      window.location.reload();
    }
  }


  useEffect(() => {
    const handleNotification = (data) => {
      setNotifications((prev) => [...prev, data]);
    };
    socket.on("getNotification", handleNotification);
    return () => {
      socket.off("getNotification", handleNotification);
    };
  }, [socket]);



  const displayNotification = ({ senderName, type }) => {
    let action;
    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <span className="p-1 text-lg">{`${senderName} ${action} your post.`}</span>
    );
  };


  const handleNotificationClick = () => {
    setOpen(!open);
    if (open) {
      setNotifications([]);
    }
  };



  return (
    <>
      <nav className='bg-slate-200 flex items-center px-4 py-2 sticky top-0'>
        <span className='font-semibold'>{user}</span>
        <span className='m-auto font-bold'>BLOG⚡APP</span>
        <div className='flex items-center gap-10'>
          <div className='flex items-center gap-5 text-2xl'>
            <span className='relative' onClick={handleNotificationClick}>
              <span><IoMdNotificationsOutline /></span>
              {
                notifications.length > 0 && !open &&
                <span className='absolute bg-red-600 w-5 h-5 text-center rounded-full text-sm font-semibold bottom-3 left-3 text-white'>{notifications.length}</span>
              }
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
        {
          open &&
          <div className="absolute top-10 right-0 bg-gray-50 text-black flex flex-col p-2">
            {notifications.map((n, index) =>
              <div key={index}>
                {displayNotification(n)}
              </div>
            )}
          </div>
        }
      </nav>
    </>
  )
}

export default Navbar;


