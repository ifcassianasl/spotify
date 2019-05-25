import React, {Component} from 'react';
import auth from '../../authorization.json';
// import api from '../../services/api';
import Axios from 'axios';

export default class Login extends Component {
  state = {
    CLIENT_KEY: ''
  }

  componentDidMount() {
    // this.getClientKey();
  }
  
  getClientKey = async () => {
    // Qualquer ação que envolva ir e voltar (promisse)
    // localstorage/sessionstorage/requisições(get/post) usa await
    const url = window.location.href;
    if(url === 'http://localhost:3000/') return;
    const clientID = url.slice(url.lastIndexOf('access_token=')+13, url.lastIndexOf('&token_type'));

    await this.setState({ CLIENT_KEY: clientID });

    // Verifica se ja ta logado no caso se tem o token no localstorage
    if(await this.isAuth()) {
      // ja tendo o token, eu to jogando no bearer
      const bearer = await sessionStorage['token'];
      
      // criando o cabeçalho da requisição onde vai o token
      const headers = {
        'Authorization':`Bearer ${bearer}`,
      };
      
      // encapsulando no formato que a API le
      const options = {headers: headers};
      
      // Tentando fazer a request com as opções, todo arquivo do user fica no endpoint
      try {
        const endpoint = await Axios.get('https://api.spotify.com/v1/me', options);
        console.log(await endpoint);
      } catch(err) {
        console.log(err);
      }
    } else {
      // Se não tiver logado ele loga usando o token no state, porém ele só loga se tiver algo no state
      sessionStorage['token'] = await this.state.CLIENT_KEY;
      console.log(sessionStorage)
      // window.location = 'http://localhost:3000';
    }
  }
  
  redirectLogin = async (e) => {
    e.preventDefault();
    window.location = await `${auth.URL}?response_type=${auth.RESPONSE_TYPE}&client_id=${auth.CLIENT_ID}&scope=${auth.SCOPE}&redirect_uri=${auth.REDIRECT_URI}`;
    
    await this.getClientKey();
  }

  isAuth = async () => {
    return sessionStorage['token'] ? true : false;
  }

  render() {
    return(
      <div id="login">
        <h1>Para acessar o site, faça login em sua conta no Spotify</h1>
        <button onClick={this.redirectLogin}>Acessar conta do Spotify</button>
      </div>
    );
  }
};