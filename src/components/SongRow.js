import React, {useState} from 'react'
import './SongRow.css'
import SpotifyWebApi from 'spotify-web-api-js';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';

const spotify = new SpotifyWebApi();


export default function SongRow({ track }) {
    const [favorite, setFavorite] = useState(false);

    function Favorite(){
        if(favorite){
          spotify.removeFromMySavedTracks([track.id]);
        } else {
          spotify.addToMySavedTracks([track.id]);
        }
        getFavoriteStatus();
      }
  
      function getFavoriteStatus(){
        spotify.containsMySavedTracks([track.id]).then((response) => {
          if(response[0]===false){
            setFavorite(false);
          } else {
            setFavorite(true);
          }
        })
      };

      function addToQueue(){
          spotify.queue(track.uri);
      }

    return (
        <div className="songRow">
            <img className="songRow__album" src={track?.album?.images[0]?.url} alt=""/>
            <div className="songRow__info">
                <h1>{track.name}</h1>
                <p>{track.artists.map((artist) => artist.name).join(", ")} - {" "} {track.album.name}</p>
            </div>
            <div className="songRow__icons">
                <FavoriteIcon className={"songRow__favorite_"+favorite} onClick={Favorite}/>
                <PlaylistPlayIcon className="songRow__queue" onClick={addToQueue}/>
            </div>
            
        </div>
    )
};
