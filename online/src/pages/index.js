import axios from "axios";
import Router from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/pages/Home.module.css';
import Cookie from 'js-cookie';


export default function Home() {

  const [grupo, setGrupo] = useState(null);
  const [username, setUsername] = useState("");

  async function handleaddgithubusername() {
    const group = JSON.parse(Cookie.get("grupo"))

    try {
      const result = await axios.get(`https://api.github.com/users/${username}`);


      group.currentUser = username;
      if (grupo.participantes.length === 0) {
        group.isAdmin = username;
      }
      if (!grupo.participantes.includes(username)) {
        group.participantes.push(username);
      }
      const res = group.votos.filter(item => {
        if (item.id === username) {
          return true;
        }
        return false;
      });

      if (res.length === 0) {
        group.votos.push({
          id: username,
          votos: [],
          totalVotos: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        });
      }

      Cookie.set("grupo", JSON.stringify(group));

      Router.push("/principal");

    } catch (err) {
      alert("Não foi possivel localizar este usuário no Github!");
    }
  }

  function loadContent() {

    const group = Cookie.get("grupo");
    if (group == null) {
      const grupo = {
        seeAllResults: true,
        whoVoted: [],
        isAdmin: "",
        currentUser: "",
        participantes: [],
        votos: []
      }
      Cookie.set("grupo", JSON.stringify(grupo));
      setGrupo(grupo);
      return;
    }

    let groupUpdated = JSON.parse(group);

    groupUpdated.currentUser = "";
    groupUpdated.isVoted = false;

    Cookie.set("grupo", JSON.stringify(groupUpdated));
    setGrupo(groupUpdated);

  }

  useEffect(() => {
    loadContent();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Queridometro.dev</title>
      </Head>
      <div className={styles.logoImage}>
      </div>
      <main>
        <img src="/images/logo.svg" alt="Queridometro.dev" />
        <h1>Bem-Vindo</h1>
        <div className={styles.gitHubContainer}>
          <img src="/images/Github.svg" alt="Github" />
          <p>Digite seu username do Github para começar</p>
        </div>
        <div className={styles.inputGroup}>
          <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
          <button onClick={handleaddgithubusername}>
            <img src="/images/arrow-right.svg" alt="IR" />
          </button>
        </div>
      </main>
    </div>
  )
}
