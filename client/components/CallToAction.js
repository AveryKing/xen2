import React from 'react';
import { motion } from "framer-motion"
const CallToAction = ({openLogin}) => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1}}
            className='select-none font-ubuntu flex justify-between  w-full items-center bg-pink-50  py-10 lg:py-0'>
            <div className=' md:w-7/12 px-5 lg:px-10 space-y-5 text-center lg:mb-10'>
                <h1 className=' text-4xl md:text-5xl lg:text-5xl md:pl-10 '>Find Your <span className='underline decoration-wavy decoration-from-font underline-offset-auto'>Flow</span></h1>
                <h2 className='lg:text-lg md:pl-10'>Tired of mindlessly scrolling on platforms such as Facebook and Twitter?
                    Here at Xen, you can explore content that will actively stimulate and engage your mind.
                    Create a free account now to make meaningful connections and mindfully flow.</h2>
                <button onClick={()=>openLogin()} className='hover:scale-105 hover:-rotate-2 hover:bg-pink-400  border w-32 px-4 mx-auto py-1 rounded-full bg-pink-500 text-white border-pink-500'>Join Now</button>

            </div>
            <div className='hidden md:w-5/12 md:inline-flex p-10 lg:mr-5 object-contain'>
                <img className='select-none'
                     src="assets/images/cta-image.png"
                     alt="Xen"/>
            </div>

        </motion.div>
    );
};

export default CallToAction;