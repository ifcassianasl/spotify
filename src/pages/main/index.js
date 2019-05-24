import React, {Component} from 'react';
import api from '../../services/api';

export default class Main extends Component {
  componentDidMount() {
    this.loadArtists();
  }

  loadArtists = async () => {
    const response = await api.get('?ids=0TcVnvKse98awlZxtUKIOk,11irmEzISytQwB3G8uhC5E,2UhA8yc1DpFfkutXq5lMah');
    console.log(response);
  }

  render() {
    return <h1>Artists</h1>
  }

};