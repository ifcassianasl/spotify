import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

// import Main from './pages/main';
import Login from './pages/login';

import './style.css';

function App() {
  return (
    <div className="App">
      {/* <SpotifyApiContext.Provider value={token}> */}
        <Header />
        <Login />
        <Footer />
      {/* </SpotifyApiContext.Provider> */}
    </div>
  );
}

export default App;
