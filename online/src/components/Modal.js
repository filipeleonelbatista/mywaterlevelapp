
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import styles from '../styles/components/Modal.module.css';

export default function Modal({ close }) {

    const [idArray, setIdArray] = useState(0);
    const [ArrayLength, setArrayLength] = useState(0);
    const [Show, setShow] = useState(false);
    const [Name, setName] = useState("");
    const [UserName, setUserName] = useState("");
    const [Image, setImage] = useState("");

    function handleTotalVotes() {
        let grupo = JSON.parse(Cookies.get("grupo"));
        if (grupo == null) {
            Router.push("/")
        }

        let totalVotes = [0, 0, 0, 0, 0, 0, 0, 0, 0]

        grupo.votos.map(part => {
            part.votos.map(voto => {
                totalVotes[voto.voteIndex] = totalVotes[voto.voteIndex] + 1;
            });
            part.totalVotos = totalVotes;
            totalVotes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        });

        Cookies.set("grupo", JSON.stringify(grupo));
    }

    async function handleVote(username, voteIndex) {
        let grupo = JSON.parse(Cookies.get("grupo"));
        if (grupo == null) {
            Router.push("/")
        }

        let updateVotes = grupo.votos;

        updateVotes.map(part => {
            if (part.id === username) {
                part.votos.push({
                    id: grupo.currentUser,
                    voteIndex
                })
            }
        });

        grupo.votos = updateVotes;

        Cookies.set("grupo", JSON.stringify(grupo));

        if (idArray == ArrayLength) {
            grupo.whoVoted.push(grupo.currentUser);
            Cookies.set("grupo", JSON.stringify(grupo));
            handleTotalVotes();
            close();
            alert("Obrigado por votar!");

            return;
        }

        let currentArrayParticipants = grupo.participantes.filter(part => {
            if (part === grupo.currentUser) {
                return false;
            }
            return true;
        });

        const result = await axios.get(`https://api.github.com/users/${currentArrayParticipants[idArray]}`);

        setArrayLength(currentArrayParticipants.length);
        setName(result.data.name);
        setUserName(result.data.login);
        setImage(result.data.avatar_url);
        setIdArray(idArray + 1);

    }

    async function loadUserInfo() {
        let grupo = JSON.parse(Cookies.get("grupo"));
        if (grupo == null) {
            Router.push("/")
        }

        let currentArrayParticipants = grupo.participantes.filter(part => {
            if (part === grupo.currentUser) {
                return false;
            }
            return true;
        });

        let currentVotos = [];
        if (grupo.votos.length === 0) {
            grupo.participantes.map(part => {
                currentVotos.push({
                    id: part,
                    votos: []
                });
            });
            grupo.votos = currentVotos;
        }


        Cookies.set("grupo", JSON.stringify(grupo));

        const result = await axios.get(`https://api.github.com/users/${currentArrayParticipants[idArray]}`);

        setArrayLength(currentArrayParticipants.length);
        setName(result.data.name);
        setUserName(result.data.login);
        setImage(result.data.avatar_url);
        setIdArray(idArray + 1);
    }

    useEffect(() => {
        const grupo = JSON.parse(Cookies.get("grupo"));
        if (grupo == null) {
            Router.push("/")
        }

        if (grupo.participantes.length <= 1) {
            alert("Não há participantes suficientes para iniciar a votação!");
            close();
            return;
        }
        setShow(true);

        loadUserInfo();
    }, [])

    return (
        <div className={styles.overlay}>
            {
                Show && (
                    <div className={styles.container}>
                        <header>
                            <img src={Image} alt="" />
                            <div className={styles.participante}>
                                <strong>{Name}</strong>
                                <div className={styles.github}>
                                    <img src="/images/Github-dark.svg" alt="" />
                                    <span>@{UserName}</span>
                                </div>
                            </div>
                        </header>
                        <div className={styles.containerButtons}>
                            <button onClick={() => handleVote(UserName, 0)} className={`${styles.btn} ${styles.btnCobra}`}>
                                <img src="/images/snake.svg" alt="" />
                            </button>
                            <button onClick={() => handleVote(UserName, 1)} className={`${styles.btn} ${styles.btnVomito}`}>
                                <img src="/images/puke.svg" alt="" />
                            </button>
                            <button onClick={() => handleVote(UserName, 2)} className={`${styles.btn} ${styles.btnSorriso}`}>
                                <img src="/images/smile.svg" alt="" />
                            </button>
                            <button onClick={() => handleVote(UserName, 3)} className={`${styles.btn} ${styles.btnTriste}`}>
                                <img src="/images/sad.svg" alt="" />
                            </button>
                            <button onClick={() => handleVote(UserName, 4)} className={`${styles.btn} ${styles.btnBomba}`}>
                                <img src="/images/bomb.svg" alt="" />
                            </button>
                            <button onClick={() => handleVote(UserName, 5)} className={`${styles.btn} ${styles.btnCoracao}`}>
                                <img src="/images/heart.svg" alt="" />
                            </button>
                            <button onClick={() => handleVote(UserName, 6)} className={`${styles.btn} ${styles.btnCoracaoPartido}`}>
                                <img src="/images/broken-heart.svg" alt="" />
                            </button>
                            <button onClick={() => handleVote(UserName, 7)} className={`${styles.btn} ${styles.btnBanana}`}>
                                <img src="/images/banana.svg" alt="" />
                            </button>
                            <button onClick={() => handleVote(UserName, 8)} className={`${styles.btn} ${styles.btnPlanta}`}>
                                <img src="/images/plant.svg" alt="" />
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}