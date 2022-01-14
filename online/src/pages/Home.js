import styles from '../styles/pages/Home.module.css';

export default function Home() { 
  return (
    <>
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
    <div className={styles.footer}>
      <img src="/images/wave.svg" alt="Onda" />
      <div className={styles.footerLogo}>
        <img src="/images/logo-footer.svg" alt="Queridometro.dev" />
      </div>
      <div className={styles.footerLinks}>
        <a href="#" target="_blank" rel="noreferer">          
          <img src="/images/instagram.svg" alt="instagram" />
        </a>
        <a href="#" target="_blank" rel="noreferer">          
          <img src="/images/youtube.svg" alt="youtube" />
        </a>
        <a href="#" target="_blank" rel="noreferer">          
          <img src="/images/github.svg" alt="github" />
        </a>
      </div>
    </div>
    </>
  )
}
