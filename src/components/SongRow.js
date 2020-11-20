import React from 'react'
import './SongRow.css'
import { useDataLayerValue } from '../DataLayer';
import SpotifyWebApi from 'spotify-web-api-js';
const spotify = new SpotifyWebApi();

export default function SongRow({ track }) {
    const [{token}, dispatch] = useDataLayerValue();

    function handleClick(e){
        e.preventDefault();
        console.log(track['uri']);
        const link = track['uri'];
        spotify.play([{context_uri:{link}}]);

    }
    return (
        <div className="songRow" onClick={handleClick}>
            <img className="songRow__album" src={track?.album?.images[0]?.url} alt=""/>
            <div className="songRow__info">
                <h1>{track.name}</h1>
                <p>{track.artists.map((artist) => artist.name).join(", ")} - {" "} {track.album.name}</p>
            </div>
            
        </div>
    )
}
