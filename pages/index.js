import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Router from 'next/router'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>emdr</title>
        <meta name="description" content="A project meant to aid in eye movement desensitization and reprocessing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.title}>
            emdr
          </div>
          <div className={styles.disclaimer}>
            This project is not meant to replace a trained professional conducting EMDR.
            Performing things under the umbrella of EMDR on yourself
            may result in adverse effects. Please proceed with caution.
          </div>
          <button className={styles.button} onClick={() => {Router.push("/demo")}}>&rarr;</button>
        </div>
      </main>
    </div>
  )
}
