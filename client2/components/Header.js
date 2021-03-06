import React from 'react';
import Image from 'next/image';
import {
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon
} from "@heroicons/react/outline";
import {HomeIcon} from "@heroicons/react/solid";

const Header = () => {
    return (
        <div className='shadow-sm border-b bg-white sticky top-0 z-50'>
            <div className='flex justify-between max-w-6xl mx-5 lg:mx-auto '>
                <div className='relative hidden lg:inline-grid w-24 cursor-pointer'>
                    <Image
                        src='/instagram-logo.png'
                        objectFit='contain'
                        layout='fill'
                    />
                </div>
                <div className='relative w-10  lg:hidden flex-shrink-0 cursor-pointer'>
                    <Image
                        src='/instagram-icon.png'
                        layout='fill'
                        objectFit='contain'
                    />
                </div>

                {/* Search */}
                <div className='max-w-xs'>
                    <div className='mt-1 relative p-3 rounded-md'>
                        <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                            <SearchIcon className='h-5 w-5 text-gray-500' />
                        </div>
                        <input className='bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black' type="text" placeholder='Search' />
                    </div>
                </div>


                {/* Right */}
                <div className='flex items-center justify-end space-x-4'>
                    <HomeIcon className='navBtn'/>
                    <MenuIcon className='h-6 md:hidden cursor-pointer'/>
                    <div className='relative navBtn'>
                        <PaperAirplaneIcon className='rotate-45 navBtn'/>
                        <div className='absolute -top-2 text-white -right-1 animate-pulse text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center'>7</div>
                    </div>
                    <PlusCircleIcon className='navBtn'/>
                    <UserGroupIcon className='navBtn'/>
                    <HeartIcon className='navBtn'/>
                    <img src='/img.png' alt='Profile pic' className='h-10 cursor-pointer rounded-full' />
                </div>

            </div>
        </div>
    );
};

export default Header;