import React from "react";
import "./Header.css";
import { useDataLayerValue } from "../DataLayer";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SpotifyWebApi from 'spotify-web-api-js';
const spotify = new SpotifyWebApi();

function Header() {
  const [{ user }, dispatch] = useDataLayerValue();

  function search(){
    const input = document.getElementById('searchText');
    if(input?.value){
      spotify.search(input.value, ['track']).then((response) =>{
        dispatch({
          type:'SET_TOP_PLAYLIST',
          top_playlist: response,
      });}
      );
  } else {
    spotify.getPlaylist('37i9dQZF1DX4JAvHpjipBk').then(( response) => {
      dispatch({
        type:'SET_TOP_PLAYLIST',
        top_playlist: response,
      });
    }); 
  }
  }

  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon />
        <input
          placeholder="Search for Artists, Songs, or Podcasts "
          type="text"
          id="searchText"
          onKeyUp={search}
        />
      </div>
      <div className="header__right">
        <Avatar alt={user?.display_name} src={user?.images[0]?.url} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;