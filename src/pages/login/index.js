import React, {Component} from 'react';
import auth from '../../authorization.json';
import Axios from 'axios';
import {isAuth} from '../../auth';
import './style.css';

export default class Login extends Component {
  state = {
    CLIENT_KEY: ''
  }

  componentDidMount() {
    this.getClientKey();
  }
  
  getClientKey = async () => {
    const url = window.location.href;
    if(url === 'http://localhost:3000/') return;
    const clientID = url.slice(url.lastIndexOf('access_token=')+13, url.lastIndexOf('&token_type'));

    await this.setState({ CLIENT_KEY: clientID });

    if(await isAuth()) {
      const bearer = await sessionStorage['token'];
      
      const headers = {
        'Authorization':`Bearer ${bearer}`,
      };
      
      const options = {headers: headers};
      
      try {
        const endpoint = await Axios.get('https://api.spotify.com/v1/me', options);
        console.log(await endpoint);
      } catch(err) {
        console.log(err);
      }
    } else {
      sessionStorage['token'] = await this.state.CLIENT_KEY;
    }
  }
  
  redirectLogin = async (e) => {
    e.preventDefault();
    window.location = await `${auth.URL}?response_type=${auth.RESPONSE_TYPE}&client_id=${auth.CLIENT_ID}&scope=${auth.SCOPE}&redirect_uri=${auth.REDIRECT_URI}`;
    
    await this.getClientKey();
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