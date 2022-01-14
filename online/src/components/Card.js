
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../styles/components/Card.module.css';
import ModalResult from './ModalResult';

export default function Card({ participante, showButton }) {

    const [ShowModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);

    async function loadContent() {
        const result = await axios.get(`https://api.github.com/users/${participante.id}`);
        setUser(result.data);
    }

    function handleOpenModal() {
        setShowModal(true)
    }

    function handleCloseModal() {
        setShowModal(false)
    }

    useEffect(() => {
        loadContent();
    }, []);

    return (
        <>

            {
                (user === null) ? <p> Carregando... </p> : (
                    <>
                        {
                            ShowModal && <ModalResult username={user.login} close={handleCloseModal} />
                        }
                        <div className={styles.container}>
                            <img src={user.avatar_url} alt={user.name} />
                            <div>
                                {
                                    participante.totalVotos.map((voto, i) => {
                                        return (
                                            <div key={i} className={styles.votesContainer}>
                                                {
                                                    i === 0 && (
                                                        <div>
                                                            <button type="button" className={styles.btnCobra}>
                                                                <img src="/images/snake.svg" alt="" />
                                                            </button>
                                                            <span>
                                                                {voto}
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    i === 1 && (
                                                        <div>
                                                            <button type="button" className={styles.btnVomito}>
                                                                <img src="/images/puke.svg" alt="" />
                                                            </button>
                                                            <span>
                                                                {voto}
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    i === 2 && (
                                                        <div>
                                                            <button type="button" className={styles.btnSorriso}>
                                                                <img src="/images/smile.svg" alt="" />
                                                            </button>
                                                            <span>
                                                                {voto}
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    i === 3 && (
                                                        <div>
                                                            <button type="button" className={styles.btnTriste}>
                                                                <img src="/images/sad.svg" alt="" />
                                                            </button>
                                                            <span>
                                                                {voto}
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    i === 4 && (
                                                        <div>
                                                            <button type="button" className={styles.btnBomba}>
                                                                <img src="/images/bomb.svg" alt="" />
                                                            </button>
                                                            <span>
                                                                {voto}
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    i === 5 && (
                                                        <div>
                                                            <button type="button" className={styles.btnCoracao}>
                                                                <img src="/images/heart.svg" alt="" />
                                                            </button>
                                                            <span>
                                                                {voto}
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    i === 6 && (
                                                        <div>
                                                            <button type="button" className={styles.btnCoracaoPartido}>
                                                                <img src="/images/broken-heart.svg" alt="" />
                                                            </button>
                                                            <span>
                                                                {voto}
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    i === 7 && (
                                                        <div>
                                                            <button type="button" className={styles.btnBanana}>
                                                                <img src="/images/banana.svg" alt="" />
                                                            </button>
                                                            <span>
                                                                {voto}
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    i === 8 && (
                                                        <div>
                                                            <button type="button" className={styles.btnPlanta}>
                                                                <img src="/images/plant.svg" alt="" />
                                                            </button>
                                                            <span>
                                                                {voto}
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        );
                                    })

                                }
                            </div>
                            {
                                showButton && (
                                    <button onClick={handleOpenModal}>
                                        <img src="/images/arrow-right-circle.svg" alt="" />
                                    </button>
                                )
                            }
                        </div>
                    </>
                )
            }
        </>
    );
}