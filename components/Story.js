import React from 'react';

const Story = ({username, img}) => {
    return (
        <div>
            <img className='rounded-full w-12' src={img} alt=""/>
            <p>{username}</p>
        </div>
    );
};

export default Story;