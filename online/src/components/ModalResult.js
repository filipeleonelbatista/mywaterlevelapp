
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import styles from '../styles/components/ModalResult.module.css';

export default function ModalResult({ username, close }) {
    const [Name, setName] = useState("");
    const [UserName, setUserName] = useState("");
    const [Image, setImage] = useState("");
    const [User, setUser] = useState({});
    const [Show, setShow] = useState(true);

    async function loadUserInfo() {
        let grupo = JSON.parse(Cookies.get("grupo"));
        if (grupo == null) {
            Router.push("/")
        }

        let participante = grupo.votos.filter(part => {
            if (part.id === username) {
                return true;
            }
            return false
        });
        const user = { ...participante[0] };
        console.log(user);
        setUser(user);

        const result = await axios.get(`https://api.github.com/users/${username}`);
        setName(result.data.name);
        setUserName(result.data.login);
        setImage(result.data.avatar_url);
        setShow(false)
    }

    useEffect(() => {
        loadUserInfo();
    }, [])

    if (Show) {
        return null;
    }

    return (
        <div className={styles.overlay}>
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
                    <button onClick={close} type="button">
                        <img src="/images/x-circle.svg" alt="" />
                    </button>
                </header>
                <div className={styles.containerButtons}>
                    {
                        !(User === {}) && User.votos.map((votos, i) => {
                            return (
                                <div key={i} className={styles.userImage} style={{ backgroundImage: `url("https://github.com/${votos.id}.png")` }}>
                                    {
                                        votos.voteIndex === 0 && (
                                            <div className={`${styles.voteContainer} ${styles.btnCobra}`}>
                                                <img src="/images/snake.svg" alt="" />
                                            </div>
                                        )
                                    }
                                    {
                                        votos.voteIndex === 1 && (
                                            <div className={`${styles.voteContainer} ${styles.btnVomito}`}>
                                                <img src="/images/puke.svg" alt="" />
                                            </div>
                                        )
                                    }
                                    {
                                        votos.voteIndex === 2 && (
                                            <div className={`${styles.voteContainer} ${styles.btnSorriso}`}>
                                                <img src="/images/smile.svg" alt="" />
                                            </div>
                                        )
                                    }
                                    {
                                        votos.voteIndex === 3 && (
                                            <div className={`${styles.voteContainer} ${styles.btnTriste}`}>
                                                <img src="/images/sad.svg" alt="" />
                                            </div>
                                        )
                                    }
                                    {
                                        votos.voteIndex === 4 && (
                                            <div className={`${styles.voteContainer} ${styles.btnBomba}`}>
                                                <img src="/images/bomb.svg" alt="" />
                                            </div>
                                        )
                                    }
                                    {
                                        votos.voteIndex === 5 && (
                                            <div className={`${styles.voteContainer} ${styles.btnCoracao}`}>
                                                <img src="/images/heart.svg" alt="" />
                                            </div>
                                        )
                                    }
                                    {
                                        votos.voteIndex === 6 && (
                                            <div className={`${styles.voteContainer} ${styles.btnCoracaoPartido}`}>
                                                <img src="/images/broken-heart.svg" alt="" />
                                            </div>
                                        )
                                    }
                                    {
                                        votos.voteIndex === 7 && (
                                            <div className={`${styles.voteContainer} ${styles.btnBanana}`}>
                                                <img src="/images/banana.svg" alt="" />
                                            </div>
                                        )
                                    }
                                    {
                                        votos.voteIndex === 8 && (
                                            <div className={`${styles.voteContainer} ${styles.btnPlanta}`}>
                                                <img src="/images/plant.svg" alt="" />
                                            </div>
                                        )
                                    }
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}