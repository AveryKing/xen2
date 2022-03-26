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

const Header = () => {
    return (
        <div>
            <div className='flex justify-between max-w-6xl'>
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
                <div className='mt-1 relative p-3 rounded-md'>
                    <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                        <SearchIcon className='h-5 w-5 text-gray-500' />
                    </div>
                    <input className='bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black' type="text" placeholder='Search' />
                </div>

                {/* Right */}
            </div>
        </div>
    );
};

export default Header;