import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './routes';

// import {isAuth} from './auth';

// // import Main from './pages/main';
// import Login from './pages/login';
// import Artists from './pages/artists';

import './style.css';

function App() {
  return (
    <div className="App">
        <Header />
        <Routes />
        {/* {isAuth() ? <Artists /> : <Login />} */}
        <Footer />
    </div>
  );
}

export default App;
