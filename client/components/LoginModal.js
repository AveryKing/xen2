import {Dialog, Transition} from '@headlessui/react'
import {Fragment} from 'react'
import {FcGoogle} from 'react-icons/fc';
import {GrGithub } from 'react-icons/gr';
import {GiYinYang} from "react-icons/gi";

const LoginModal = ({isOpen, toggle}) => {
    const closeModal = () => {
        toggle();
    }
    const title = 'Please sign in';
    return (

        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeModal}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0"/>
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
              &#8203;
            </span>
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-80"/>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >

                        <div
                            className="select-none -mt-52 md:-mt-20 inline-block w-full max-w-sm p-6 my-0 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title
                                as="h5"
                                className="text-lg  font-medium leading-6 text-gray-900"
                            >
                                <div className='flex justify-center items-center mb-3'>
                                    <GiYinYang size={50} className='animate-spin-slow text-pink-500'/>
                                    <p className='font-logo text-4xl font-semibold '>Xen</p>
                                </div>

                                <p>{title}</p>

                            </Dialog.Title>

                            <div className="mt-5 justify-center flex flex-col space-y-3">

                                        <div className='hover:shadow-sm hover:bg-gray-100 hover:scale-105 hover:cursor-pointer flex font-semibold  mx-auto w-2/3 select-none border-2 p-1 rounded-full items-center space-x-3 text-1/2 justify-center'>
                                            <FcGoogle size={25}/>
                                            <p className='text-pink-600'>Sign In With Google</p>
                                        </div>
                                        <div className='hover:shadow-sm hover:bg-gray-100 hover:scale-105  hover:cursor-pointer flex font-semibold  mx-auto w-2/3 select-none border-2 p-1 rounded-full items-center space-x-3 text-1/2 justify-center'>
                                            <GrGithub size={25}/>
                                            <p className='text-pink-600'>Sign In With GitHub</p>
                                        </div>
                            </div>

                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default LoginModal;