import React, { useState } from 'react';
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaRegCommentDots, FaRegShareFromSquare } from "react-icons/fa6";
import { MdOutlineErrorOutline } from "react-icons/md";

const Card = ({ post, socket }) => {
    const [liked, setLiked] = useState(false);

    const handleNotification = () => {
        setLiked(true);
        socket.emit('send_notification', post.username);
    };

    return (
        <>
            <div className='border md:w-[25%] m-2 grid p-1 hover:shadow-xl hover:shadow-gray-700 transition-shadow duration-500'>
                <span className='flex items-center gap-2 py-1'>
                    <img className='w-9 h-9 rounded-full' src={post.userImg} />
                    <span className='font-semibold'>{post.fullname}</span>
                </span>
                <img src={post.postImg} />
                <div className='flex items-center justify-between px-1 py-2 text-xl'>
                    <div className='flex items-center gap-3'>
                        <span onClick={handleNotification}>
                            {liked ? <FcLike /> : <FaRegHeart />}
                        </span>
                        <span><FaRegCommentDots /></span>
                        <span><FaRegShareFromSquare /></span>
                    </div>
                    <span><MdOutlineErrorOutline /></span>
                </div>
            </div>
        </>
    );
};

export default Card;
