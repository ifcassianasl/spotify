import React, {Component} from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './style.css';

export default class Artists extends Component {
    state = {
        token: sessionStorage['token'],
        artists_id: ['0TcVnvKse98awlZxtUKIOk', '11irmEzISytQwB3G8uhC5E', '2UhA8yc1DpFfkutXq5lMah'],
        artists: []
    }

    componentDidMount() {
        this.loadArtists();
    }

    loadArtists = async () => {
        const {token, artists_id} = this.state;
        
        const headers = {
            'Authorization':`Bearer ${token}`,
        };
          
        const options = {headers: headers};

        const response = await api.get(`/artists?ids=${artists_id}`, options);
        const {artists} = response.data;
        this.setState({artists});
        console.log(artists)
    }

    render() {
        const {artists} = this.state;
        return(
            <div id="artists">
                {artists.map(artist => (
                    <div key={artist.id} className="artist">
                        <Link to={`/artists/${artist.id}`} className="artist">
                            <img src={artist.images[1].url} alt={artist.name} />
                            <h2>{artist.name}</h2>
                        </Link>
                    </div>
                ))}
            </div>
        );
    }
};