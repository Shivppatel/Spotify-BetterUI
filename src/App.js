import React, { useEffect, useState} from "react";
import Login from './components/Login';
import Player from './components/Player';
import { getTokenFromURL } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import {useDataLayerValue} from './DataLayer';
const spotify = new SpotifyWebApi();
function App() {
  const [{ user, token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromURL();
    window.location.hash = "";
    const _token = hash.access_token;
    if(_token){
      dispatch({
        type:'SET_TOKEN',
        token: _token,
      });

      spotify.setAccessToken(_token);
      
      spotify.getMe().then(_user => {
        dispatch({
          type:'SET_USER',
          user: _user,
        });
      });
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type:'SET_PLAYLISTS',
          playlists: playlists,
        });
      });
      spotify.getPlaylist('37i9dQZF1DX4JAvHpjipBk').then(( response) => {
        dispatch({
          type:'SET_TOP_PLAYLIST',
          top_playlist: response,
        });
      });
    }
  }, []);

  return (
    <div className="app">
      {token ? (<Player />) : (<Login />)}
    </div>
  );
}

export default App;
