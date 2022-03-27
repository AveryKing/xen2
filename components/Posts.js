import React from 'react';
import Post from "./Post";

const posts = [
    {
        id:'123',
        username:'avery',
        userImage: '',
        image: '',
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