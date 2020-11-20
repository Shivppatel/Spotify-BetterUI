import React from 'react';
import './SidebarOption.css';
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from '../DataLayer';
const spotify = new SpotifyWebApi();

function SidebarOption({ title, Icon, id}) {
    const [{token, top_playlist }, dispatch] = useDataLayerValue();

    function handlePlaylistClick(e){
        e.preventDefault();
        spotify.getPlaylist(id).then(( response) => {
            if(response.images.length > 0){
                dispatch({
                type:'SET_TOP_PLAYLIST',
                top_playlist: response,
                });}
            });
        
    }
    return (
        <div className="sidebarOption"onClick={handlePlaylistClick} >
            {Icon && <Icon className="sidebarOpion__icon" />}
            {Icon ? <h4>{ title }</h4> : <p>{ title }</p>}
        </div>
    )
}

export default SidebarOption

