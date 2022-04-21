import {GiYinYang} from 'react-icons/gi'
import {motion} from "framer-motion";

const Navbar = ({openLogin}) => {

    const topRightGroup =
        <>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
                className='flex items-center space-x-5 text-pink-500'>
                <h3>Sign In</h3>
                <button
                    onClick={() => openLogin()}
                    className='hover:scale-105 hover:bg-pink-400 border px-4 py-1 rounded-full bg-pink-500 text-white border-pink-500'>
                    Get Started
                </button>
            </motion.div>
        </>;

    return (
        <>
            <header className='select-none font-ubuntu flex justify-between px-8 py-3 max-w-full mx-auto border-2'>
                <div className="flex items-center space-x-5">
                    <div
                        className={'flex items-center space-x-2 text-2xl'}>
                        <motion.a
                            initial={{rotate: 0}}
                            animate={{rotate: 360}}
                            transition={{duration: 10}}
                            href={'/'}>
                            <GiYinYang
                                className={'text-4xl text-pink-500'}/>
                        </motion.a>
                        <motion.p
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 1}}
                            className='font-logo font-semibold lg:text-3xl'>Xen
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 1}}
                        className=" hidden md:inline-flex items-center space-x-5">
                        <h3>Home</h3>
                        <h3>Explore</h3>
                        <h3>About</h3>
                    </motion.div>

                </div>
                {topRightGroup}
            </header>
        </>
    )
}
export default Navbar;