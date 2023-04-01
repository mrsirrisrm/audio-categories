import type { NextPage } from 'next'
import Head from 'next/head'
import MainView from '../components/MainView'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Audio categories</title>
        <meta name="description" content="Audio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Audio categories</h1>

        <MainView />

      </main>

    </div>
  )
}

export default Home
