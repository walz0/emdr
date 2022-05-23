import Head from 'next/head'
import Image from 'next/image'
import Emdr from '../../components/emdr'
import styles from '../../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>emdr - demo</title>
        <meta name="description" content="A project meant to aid in eye movement desensitization and reprocessing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <Emdr />
      </main>
    </div>
  )
}