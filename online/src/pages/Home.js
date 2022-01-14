import styles from '../styles/pages/Home.module.css';

export default function Home() { 
  return (
    <div className={styles.container}>
      <div className={styles.logoImage}>
      </div>
      <main>
        <img src="/images/logo.svg" alt="Queridometro.dev" />
        <h1>Bem-Vindo</h1>
        <div className={styles.gitHubContainer}>
          <p>Faça login com de maneira rápida e facil com o Google</p>
        </div>
        <div className={styles.inputGroup}>
          <button onClick={() => {}}>
            <img src="/images/google.svg" alt="IR" />
            Fazer login usando o Google
          </button>
        </div>
      </main>
    </div>
  )
}
