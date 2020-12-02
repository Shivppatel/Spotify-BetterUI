import React, {useState} from 'react'
import './SongRow.css'
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from '../DataLayer';


const spotify = new SpotifyWebApi();
export default function SongRow({ track }) {
    const [{ playing }, dispatch] = useDataLayerValue();
    const [favorite, setFavorite] = useState(false);
    const [isPlaying, setPlaying] = useState(false);

    function Favorite(track) {
      if(track?.id){
        if (favorite) {
            spotify.removeFromMySavedTracks([track.id]);
        } else {
            spotify.addToMySavedTracks([track.id]);
        }
        getFavoriteStatus(track);
      }
    }
  
    function getFavoriteStatus(track) {
      if(track?.id){
        spotify.containsMySavedTracks([track.id]).then((response) => {
            if (response[0] === false) {
                setFavorite(!favorite);
            } else if (response[0] === true) {
                setFavorite(!favorite);
            }
        })
      }
    };
  
    function addToQueue(track) {
      if(track?.uri){
        spotify.queue(track.uri);
      }
    }
    function PlaySong(song) {
        Pause();
        spotify.play({uris: [song]}).catch(e => {
          console.log(e);
        }) 
        updatePlaying();
      };
    
      function Pause() {
        spotify.pause().catch(e => {
          console.log('Already Paused!');
        })
        updatePlaying();
      };
      async function updatePlaying() {
        await sleep(1000);
        spotify.getMyCurrentPlaybackState().then((response) => {
          dispatch({
            type: 'SET_PLAYING',
            playing: response,
            currentState: response.is_playing,
          })
          if(response.is_playing && response.uri === playing.uri){
            setPlaying(true);
          } else {
            setPlaying(false);
          }
        })}
    
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  
    return (
        <div className="songRow">
            <div className="body__song_icon">
              <FavoriteIcon className={"songRow__favorite_" + favorite} onClick={()=>Favorite(track)} />
              <PlaylistPlayIcon className="songRow__queue" onClick={()=>addToQueue(track)} />
            </div>
            <img className="songRow__album" src={track?.album?.images[0]?.url} alt=""  onClick={()=> PlaySong(track.uri)}/>
            <div className="songRow__info"  onClick={()=> PlaySong(track.uri)}>
                <h1>{track.name}</h1>
                <p>{track.artists.map((artist) => artist.name).join(", ")} - {" "} {track.album.name}</p>
            </div>
        </div>
    )
};
