import React from 'react';
import { useDataLayerValue } from '../DataLayer';
import './Body.css';
import Header from './Header';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SongRow from './SongRow'
import SpotifyWebApi from 'spotify-web-api-js';
const spotify = new SpotifyWebApi();

function Body({ client }) {
  const [{ top_playlist, currentState, playing }, dispatch] = useDataLayerValue();

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function Play() {
    if (currentState === undefined || currentState === false) {
      spotify.play(playing).catch(e => {
        console.log('Already Playing!');
      })
    }
    updatePlaying();
  };


  function Pause() {
    if (currentState === true) {
      spotify.pause().catch(e => {
        console.log('Already Paused!');
        updatePlaying();
      })
    }
    updatePlaying();
  };

  function PlaySong() {
    if (currentState === true) {
      spotify.pause().catch(e => {
        console.log('Already Paused!');
        spotify.play();
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
      console.log(response.is_playing);
      dispatch({
        type: 'SET_PLAYING',
        playing: response,
        currentState: response.is_playing,
      })
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
            {currentState !== true ? (< PlayCircleFilledIcon fontSize="large" className="body__suffle" onClick={Play} />) : (< PauseCircleFilledIcon fontSize="large" className="body__suffle" onClick={Pause} />)}
          </div>
        </div>
        <div className="body__songs">
          {top_playlist?.tracks.items.map((item) => (
            <SongRow track={item.track} />
          ))};
                </div>
      </div>
    )
  } else if (top_playlist) {
    return (
      <div className="body__home">
        <Header />
        {top_playlist.map(playlist => (
          <div className="body__info" onClick={() => setTopPlaylist(playlist.id)}>
            <img src={playlist?.images[0].url} alt="" />
            <div className="body__infoText">
              <p>PLAYLISTS</p>
              <h2>{playlist?.name}</h2>
              <p>{playlist?.description}</p>
            </div>
            <div className="body__icons">
              {currentState !== true ? (< PlayCircleFilledIcon fontSize="large" className="body__suffle" onClick={Play} />) : (< PauseCircleFilledIcon fontSize="large" className="body__suffle" onClickCapture={Pause} />)}
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
            <SongRow track={item} />
          ))}
        </div>

      </div>)
  }
}

export default Body