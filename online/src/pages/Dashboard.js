import Sidebar from '../components/Sidebar';
import WaterLeverlChart from '../components/WaterLevelChart';
import Measures from '../components/Measures';
import styles from '../styles/pages/Dashboard.module.css';

export default function Dashboard() {

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.innerContainer}>
                <h1>Dashboard</h1>
                <div className={styles.gridContainer}>
                    <div className={styles.gridContainerColumn}>
                        <div className={styles.wContainer}>
                            <h3>Volume atual</h3>
                            <WaterLeverlChart />
                        </div>
                        <div className={styles.wContainer}>
                            <h3>Grafico 2</h3>
                        </div>
                    </div>
                    <div className={styles.wContainerFull}>
                        <h3>Medições</h3>
                        <Measures />
                    </div>
                </div>
                <div className={styles.footer}>
                    <img src="/images/logo-footer.svg" alt="Queridometro.dev" />
                </div>
            </div>
        </div>
    )
}
