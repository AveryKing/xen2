import Header from '../components/Header'
import Head from 'next/head'
import Image from 'next/image'

const Home = () => {
  return (
    <div>
        <Head>
            <title>Instagram Clone</title>
            <link rel='icon' href='/favicon.ico' />
        </Head>
      <Header />
    </div>
  )
}

export default Home
