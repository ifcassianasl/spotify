import React, {Component} from 'react';
import { SpotifyApiContext, Artist } from 'react-spotify-api';

export default class Spotify extends Component {
  render() {
    return(
      <SpotifyApiContext.Provider value={token}>
          <Artist id={['0TcVnvKse98awlZxtUKIOk', '11irmEzISytQwB3G8uhC5E', '2UhA8yc1DpFfkutXq5lMah']}>
              {(artist, loading, error) =>
                  artist ? (
                      <div>
                          <h1>{artist.name}</h1>
                          <ul>
                              {artist.genres.map(genre => (
                                  <li key={genre}>{genre}</li>
                              ))}
                          </ul>
                      </div>
                  ) : null
              }
          </Artist>
      </SpotifyApiContext.Provider>
    );
  }
};