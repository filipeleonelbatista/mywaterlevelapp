import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import styles from '../styles/pages/Principal.module.css';


export default function Principal() {
    const [loggedUser, setLoggedUser] = useState(null);
    const [ShowModal, setShowModal] = useState(false);
    const [IsVoted, setIsVoted] = useState(false);
    const [IsAdmin, setIsAdmin] = useState(false);
    const [ShowResults, setShowResults] = useState(false);

    function handleShowModal() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
        setIsVoted(true);
    }

    function handleChangeShowResult(checked) {
        setShowResults(checked);

        let part = JSON.parse(Cookies.get("grupo"));

        part.seeAllResults = checked;

        console.log(part);

        Cookies.set("grupo", JSON.stringify(part));
    }

    async function loadContent() {
        const part = JSON.parse(Cookies.get("grupo"));
        if (part == null) {
            Router.push("/")
        }

        const result = await axios.get(`https://api.github.com/users/${part.currentUser}`);

        setLoggedUser(result.data);
        setIsVoted(part.whoVoted.includes(part.currentUser));
        setIsAdmin(part.isAdmin === part.currentUser ? true : false);
        setShowResults(part.seeAllResults ? true : false);
    }

    useEffect(() => {
        loadContent();
    }, []);

    return (
        <>
            {
                (loggedUser === null) ? <p> Carregando... </p> : (
                    <main className={styles.container}>
                        <Head>
                            <title>Principal | Queridometro.dev</title>
                        </Head>
                        {
                            ShowModal && <Modal close={handleCloseModal} />
                        }
                        <Sidebar />
                        <div className={styles.innerContainer}>
                            <div className={styles.section}>
                                <img src={loggedUser.avatar_url} alt={loggedUser.name} />
                                <div className={styles.github}>
                                    <img src="/images/Github-dark.svg" alt="" />
                                    <span>
                                        <a href={loggedUser.html_url} target="_blank" rel="noopener noreferrer">
                                            @{loggedUser.login}
                                        </a>
                                    </span>
                                </div>
                                <div className={styles.social}>
                                    <span><strong>{loggedUser.followers}</strong>Follows</span>
                                    <span><strong>{loggedUser.public_repos}</strong>Repos</span>
                                </div>
                                <span>{loggedUser.bio}</span>
                                {
                                    IsVoted ? '' : (
                                        <button type="button" onClick={handleShowModal}>Iniciar Votação</button>
                                    )
                                }
                                {
                                    IsAdmin && (
                                        <div className={styles.switchContainer}>
                                            <label className={styles.switch}>
                                                <input type="checkbox" checked={ShowResults} onChange={(e) => { handleChangeShowResult(e.target.checked) }} />
                                                <span className={`${styles.slider} ${styles.round}`}></span>
                                            </label>
                                            <p>Mostrar resultado de votos</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </main>
                )
            }
        </>
    )
}
