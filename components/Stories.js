import React, {useEffect} from 'react';
import faker from "@faker-js/faker";

const Stories = () => {
    useEffect( () => {
        const fakes = [];
        for (let i=0;i<20;i++) {
            fakes.push({...faker.helpers.contextualCard(),id:i})
        }
        console.log(fakes)
    }, [])
    return (
        <div>

        </div>
    );
};

export default Stories;