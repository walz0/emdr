import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

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
            This project is not meant to replace trained professionals conducting EMDR.
            Performing things under the umbrella of EMDR such as brainspotting on yourself
            may result in adverse effects. Please proceed with caution.
          </div>
        </div>
      </main>
    </div>
  )
}
