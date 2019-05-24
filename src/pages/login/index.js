import React, {Component} from 'react';
import auth from '../../authorization.json';
import api from '../../services/api';
import Axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.getClientKey = this.getClientKey.bind(this);
  }

  state = {}

  componentDidMount() {
  }
  
  getClientKey = () => {
    const url = window.location.href;
    const clientID = url.slice(url.lastIndexOf('access_token=')+13, url.lastIndexOf('&token_type'));
    
    this.setState({ CLIENT_KEY: clientID });
    console.log(this.state);
    this.isAuth();
  }
  
  redirectLogin = async (e) => {
    e.preventDefault();
    window.location = await `${auth.URL}?response_type=${auth.RESPONSE_TYPE}&client_id=${auth.CLIENT_ID}&scope=${auth.SCOPE}&redirect_uri=${auth.REDIRECT_URI}`;
    
    this.getClientKey()
  }

  isAuth = async () => {
    // return await api.get(`${auth.AUTH_URL}?`);
    Axios.post('https://accounts.spotify.com/api/token');
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