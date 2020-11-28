import React from 'react';
import './SidebarOption.css';
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from '../DataLayer';
const spotify = new SpotifyWebApi();

function SidebarOption({ title, Icon, id, type }) {
    const [{ top_playlist }, dispatch] = useDataLayerValue();

    function handlePlaylistClick(e) {
        e.preventDefault();
        if (type === 'id') {
            spotify.getPlaylist(id).then((response) => {
                if (response.images.length > 0) {
                    dispatch({
                        type: 'SET_TOP_PLAYLIST',
                        top_playlist: response,
                    });
                }
            });
        } else if (type === 'home') {
            spotify.getFeaturedPlaylists().then((respone) => {
                dispatch({
                    type: 'SET_TOP_PLAYLIST',
                    top_playlist: respone['playlists']['items'],
                });
            })
        } else if (type === 'search') {
            dispatch({
                type: 'SET_TOP_PLAYLIST',
                top_playlist: null,
            });
        }
    }
    return (
        <div className="sidebarOption" onClick={handlePlaylistClick} >
            {Icon && <Icon className="sidebarOpion__icon" />}
            {Icon ? <h4>{title}</h4> : <p>{title}</p>}
        </div>
    )
}

export default SidebarOption

