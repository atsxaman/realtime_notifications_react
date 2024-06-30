import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import {posts} from './data';
import {io} from 'socket.io-client';

const App = () => {

  const [user,setUser] = useState('');
  const [username,setUserName] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:3000"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);


  return (
    <>

    {
      user?
      (
        <>
       <Navbar user={user} socket={socket} />

       <div className='w-full flex items-center justify-center flex-wrap md:gap-3 '>
       {
        posts.map((post) => (
          <Card key={post.id} post={post} socket={socket} user={user} />
        ))
       }
       </div>
       
       </>
      )
      :
      (
        <>
        <div className='shadow-xl shadow-gray-700 grid justify-center py-4 mt-32 w-[90%] md:w-[25%] m-auto'>
        <h1 className='text-center font-bold text-2xl'>Login</h1>
        <input 
        onChange={(e)=>setUserName(e.target.value)} 
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
           setUser(username)
          }
        }} 
        className='p-2 my-4 border focus:outline-none' type='text' placeholder='enter username' />
        <button onClick={()=>setUser(username)} className='bg-green-600 hover:bg-green-700 text-white py-1 font-semibold w-24 m-auto'>Login</button>
        </div>
        </>
      )
    }

    </>
  )
}

export default App

