import React, {useEffect, useState} from 'react';
import faker from "@faker-js/faker";
import Log from "tailwindcss/lib/util/log";
import Story from "./Story";

const Stories = () => {
    const [stories,setStories] = useState([])
    useEffect( () => {
        const fakes = [];
        for (let i=0;i<20;i++) {
            fakes.push({...faker.helpers.contextualCard(),id:i})
        }
        setStories(fakes);
    }, [])

    return (
        <div className='scrollbar-thin scrollbar-thumb-black flex p-6 space-x-2 bg-white mt-8 border-gray-200 rounded-sm overflow-x-scroll rounded-2xl'>
            {stories.map(profile => (
                <Story
                    key={profile.id}
                    username={profile.username}
                    img={profile.avatar}
                />
            ))}
        </div>
    );
};

export const getStaticProps = () => {

}
export default Stories;