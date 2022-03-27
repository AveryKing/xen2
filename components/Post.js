import React from 'react';
import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
const Post = ({username, id, userImage,message,image}) => {
    return (
        <div>
            {/* Header */ }
            <div className='flex items-center p-5'>
                <img className='rounded-full h-12 w-12 object-contain p-1 mr-3 border' src={userImage} alt=""/>
                <p className='flex-1 font-bold'>{username}</p>
                <DotsHorizontalIcon className='h-5'/>
            </div>
        </div>
    );
};

export default Post;