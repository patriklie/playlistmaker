import Header from './components/Header';
import SearchForm from './components/SearchForm';
import Result from './components/Result';
import Playlist from './components/Playlist';
import './css/app.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SpotifyProvider } from './SpotifyContext';
import Profile from './components/Profile';


function App() {

  const CLIENT_ID = "05efee28e5ae4af79e47338fe85ca32d";
  const REDICRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");


  useEffect(() => {
    let urlParams = new URLSearchParams(window.location.hash.replace("#", "?"));
    let newToken = urlParams.get('access_token');
  
    if (newToken) {
      window.localStorage.setItem("token", newToken);
      setToken(newToken);
    }
  
    window.location.hash = "";
  }, []);

  
  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  return (
    <SpotifyProvider>
    <div className="App">

    {token ? (
    <>
      <Header />
      <SearchForm />
      <div className="grid-container">
        <Result />
        <Playlist />
      </div> 
      <Profile />
    </>
    )
    : 
      <a className='login-btn' href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDICRECT_URI}&response_type=${RESPONSE_TYPE}&scope=playlist-modify-private%20playlist-modify-public%20user-read-private%20user-read-email`}>Login to Spotify</a>
      }

      {token && <button className="logout-btn" onClick={logout}>LOGOUT</button>}
    </div>
    </SpotifyProvider>
  );
  
}

export default App;