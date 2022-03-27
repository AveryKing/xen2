import Header from '../components/Header'
import Head from 'next/head'
import Feed from "../components/Feed";
import faker from "@faker-js/faker";

const Home = ({fakes}) => {
    return (
        <div>
            <Head>
                <title>Instagram Clone</title>
                <link rel='icon' href='/favicon.ico'/>
            </Head>
            <Header/>
            <Feed />
        </div>
    )
}


export default Home
