import Cookies from 'js-cookie';
import Router from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Sidebar from '../components/Sidebar';
import styles from '../styles/pages/Pontos.module.css';

export default function Pontos() {

    const [grupo, setGrupo] = useState(null);

    function loadContent() {
        const part = JSON.parse(Cookies.get("grupo"));
        if (part == null) {
            Router.push("/")
        }
        setGrupo(part);
    }

    useEffect(() => {
        loadContent();
    }, []);

    return (
        <>
            {
                (grupo === null) ? <p> Carregando... </p> : (
                    <main className={styles.container}>
                        <Head>
                            <title>Resultados | Queridometro.dev</title>
                        </Head>
                        <Sidebar />
                        <div className={styles.innerContainer}>
                            <div>
                                <h2>Resultados</h2>
                                {
                                    grupo.votos.map(part => {
                                        return <Card key={part.id} participante={part} showButton={grupo.seeAllResults} />
                                    })
                                }
                            </div>
                        </div>
                    </main>
                )
            }
        </>
    )
}

