
import styles from '../styles/components/Sidebar.module.css';
import { NavLink, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const router = useLocation();
    return (
        <aside className={styles.container}>
            <img src="/images/speedometer-white.png" alt="Queridometro.dev" />
            <div className={styles.menu}>
                <NavLink to="/Dashboard">
                    <div className={(router.pathname === "/Dashboard") ? styles.activedDiv : ''}>
                        <img src="/images/home.svg" alt="Dashboard" />
                    </div>
                </NavLink>
            </div>
            <NavLink to="/" className={styles.exitButton}>
                <img src="/images/log-out.svg" alt="Sair" />
            </NavLink>
        </aside>
    );
}