import React from 'react';
import Post from "./Post";

const posts = [
    {
        id:'123',
        username:'avery',
        userImage: 'https://avatars.githubusercontent.com/u/76629826?v=4',
        image: 'https://images.immediate.co.uk/production/volatile/sites/7/2018/09/GettyImages-3227593_CROP-0005720.jpg',
        message: 'hello world!'

    }
]
const Posts = () => {
    return (
        <div>
            {posts.map(post => (
                <Post key={post.id}
                username={post.username}
                id={post.id}
                userImage={post.userImage}
                image={post.image}
                message={post.message}
                />
            ))}
        </div>
    );
};

export default Posts;