import { React, useState } from 'react';
import { useDataLayerValue } from '../DataLayer';
import './Body.css';
import Header from './Header';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SongRow from './SongRow'
import SpotifyWebApi from 'spotify-web-api-js';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';

const spotify = new SpotifyWebApi();

function Body({ client }) {
  const [{ top_playlist, currentState, playing }, dispatch] = useDataLayerValue();
  const [isPlaying, setPlaying] = useState(false);
  const [favorite, setFavorite] = useState(false);

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
              setFavorite(false);
          } else {
              setFavorite(true);
          }
      })
    }
  };

  function addToQueue(track) {
    if(track?.uri){
      spotify.queue(track.uri);
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function PlayPlaylist(playlist) {
    Pause();
    spotify.play({context_uri: playlist}).catch(e => {
      console.log(e);
    })
    updatePlaying();
  };

  function PlaySong(song) {
    Pause();
    spotify.play({uris: [song]}).catch(e => {
      console.log(e);
    }) 
    updatePlaying();
  };

  function Pause() {
    if (isPlaying === true) {
      spotify.pause().catch(e => {
        console.log('Already Paused!');
        updatePlaying();
      })
    }
    updatePlaying();
  };

  function setTopPlaylist(id) {
    spotify.getPlaylist(id).then((response) => {
      dispatch({
        type: 'SET_TOP_PLAYLIST',
        top_playlist: response,
      });
    });
  }

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
    })

  };

  if (top_playlist?.tracks?.items[0]?.added_at !== undefined) {
    return (
      <div className="body">
        <Header />
        <div className="body__info">
          <img src={top_playlist?.images[0].url} alt="" />
          <div className="body__infoText">
            <p>PLAYLISTS</p>
            <h2>{top_playlist?.name}</h2>
            <p>{top_playlist?.description}</p>
          </div>
          <div className="body__icons">
            {currentState !== true ? (< PlayCircleFilledIcon fontSize="large" className="body__suffle" onClick={() => PlayPlaylist(top_playlist.uri)} />) : (< PauseCircleFilledIcon fontSize="large" className="body__suffle" onClick={Pause} />)}
          </div>
        </div>
        <div className="body__songs">
          {top_playlist?.tracks.items.map((item) => (
          <div  className="body__song">
            <div className="body__song_icon">
              <FavoriteIcon className={"songRow__favorite_" + favorite} onClick={()=>Favorite(item.track)} />
              <PlaylistPlayIcon className="songRow__queue" onClick={()=>addToQueue(item.track)} />
            </div>
            <div className="songRow__info" onClick={()=> PlaySong(item.track.uri)}>
              <SongRow track={item.track}/>
            </div>
          </div>
          ))};
                </div>
      </div>
    )
  } else if (top_playlist?.map) {
    return (
      <div className="body__home">
        <Header />
        {top_playlist?.map(playlist => (
          <div className="body__info" onClick={() => setTopPlaylist(playlist.id)}>
            <img src={playlist?.images[0].url} alt="" />
            <div className="body__infoText">
              <p>PLAYLISTS</p>
              <h2>{playlist?.name}</h2>
              <p>{playlist?.description}</p>
            </div>
            <div className="body__icons">
              {currentState !== true ? (< PlayCircleFilledIcon fontSize="large" className="body__suffle"onClick={()=>PlayPlaylist(top_playlist.uri)} />) : (< PauseCircleFilledIcon fontSize="large" className="body__suffle" onClickCapture={Pause} />)}
            </div>
          </div>

        ))}
      </div>
    )

  } else {
    return (
      <div className="body">
        <Header />
        <div className="body__songs">
          {top_playlist?.tracks.items.map((item) => (
            <div  className="body__song">
            <div className="body__song_icon">
              <FavoriteIcon className={"songRow__favorite_" + favorite} onClick={()=>Favorite(item)} />
              <PlaylistPlayIcon className="songRow__queue" onClick={()=>addToQueue(item)} />
            </div>
            <div className="songRow__info" onClick={()=> PlaySong(item.uri)}>
            <SongRow track={item}/>
            </div>
            </div>
          ))}
        </div>

      </div>)
  }
}

export default Body