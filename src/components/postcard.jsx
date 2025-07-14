import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";


function PostCard({
    $id,
    title,
    featuredimage,
}){
    // Debug log to check featuredimage value
    const imageUrl = featuredimage ? appwriteService.getFileView(featuredimage) : '';
    console.log('PostCard featuredimage:', featuredimage, 'imageUrl:', imageUrl);
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    {featuredimage ? (
                        <img src={imageUrl} alt={title} className='rounded-xl' />
                    ) : (
                        <div className='rounded-xl bg-gray-300 w-full h-40 flex items-center justify-center text-gray-500'>No Image</div>
                    )}
                </div>
                <h2
                    className='text-xl font-bold'
                >{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard;