import React, {useEffect, useState} from 'react';
import faker from "@faker-js/faker";
import Log from "tailwindcss/lib/util/log";

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
        <div>

        </div>
    );
};

export const getStaticProps = () => {

}
export default Stories;