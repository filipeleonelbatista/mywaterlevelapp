
import styles from '../styles/components/Sidebar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Sidebar() {
    const router = useRouter();
    return (
        <aside className={styles.container}>
            <img src="/images/speedometer-white.png" alt="Queridometro.dev" />
            <div className={styles.menu}>
                <Link href="/principal">
                    <div className={(router.pathname === "/principal") ? styles.activedDiv : ''}>
                        <img src="/images/home.svg" alt="Principal" />
                    </div>
                </Link>
                <Link href="/pontos">
                    <div className={(router.pathname === "/pontos") ? styles.activedDiv : ''}>
                        <img src="/images/award.svg" alt="Pontuação" />
                    </div>
                </Link>
            </div>
            <Link href="/">
                <div className={styles.exitButton}>
                    <img src="/images/log-out.svg" alt="Sair" />
                </div>
            </Link>
        </aside>
    );
}