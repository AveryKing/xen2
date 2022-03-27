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
        <div className="bg-white my-7 border rounded-sm">
            {/* Header */}
            <div className="flex items-center p-5">
                <img
                    src={userImage}
                    alt=""
                    className="rounded-full h-12 w-12 object-contain border p-1 mr-3 "
                />
                <p className="flex-1 font-bold">{username}</p>

                <DotsHorizontalIcon className="h-5 cursor-pointer" />
            </div>

            {/* img */}

            <img src={image} alt="" className="object-cover w-full" />

            {/* Buttons */}
                <div>
                    <HeartIcon className='btn'/>
                    <ChatIcon className='btn'/>
                    <PaperAirplaneIcon class='btn'/>
                </div>
        </div>
    );
};

export default Post;