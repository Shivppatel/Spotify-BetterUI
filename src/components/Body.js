import React from 'react';
import { useDataLayerValue } from '../DataLayer';
import './Body.css';
import Header from './Header';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SongRow from './SongRow'
import SpotifyWebApi from 'spotify-web-api-js';
const spotify = new SpotifyWebApi();

function Body({ client}) {
    const [{top_playlist, currentState, playing}, dispatch] = useDataLayerValue();
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function Play(){
        if(currentState===undefined || currentState===false){
          spotify.play(playing).catch(e => {
            console.log('Already Playing!');
          })
        }
        updatePlaying();
      };
   
      async function Pause(){
        if(currentState === true ){
          spotify.pause().catch(e => {
            console.log('Already Paused!');
            updatePlaying();
          })
        }
        updatePlaying();
      };

      async function updatePlaying(){
        await sleep(1000);
        spotify.getMyCurrentPlaybackState().then((response) => {
          console.log(response.is_playing);
          dispatch({
            type:'SET_PLAYING',
            playing: response,
            currentState: response.is_playing,
          })
          })
        
      };

    if(top_playlist?.tracks?.items[0]?.added_at !== undefined){
    return (
            <div className="body">
                <Header/>
                <div className="body__info">
                    <img src={top_playlist?.images[0].url} alt=""/>
                        <div className="body__infoText">
                            <p>PLAYLISTS</p>
                            <h2>{top_playlist?.name}</h2>
                            <p>{top_playlist?.description}</p>
                        </div>
                </div>
                <div className="body__songs">
                    <div className="body__icons">
                    {currentState!==true ? (< PlayCircleFilledIcon fontSize="large" className="body__suffle" onClick={Play}/>) : (< PauseCircleFilledIcon fontSize="large" className="body__suffle" onClick={Pause}/>)}
                        <FavoriteIcon fontSize="large" />
                        <MoreHorizIcon />
                    </div>
                    {top_playlist?.tracks.items.map((item) => (
                        <SongRow track={item.track} key={item.track.name}/>
                    ))};
                </div>
            </div>
    )
    } else {
        return (
            <div className="body">
                <Header/>
            <div className="body__songs">
                    {top_playlist?.tracks.items.map((item) => (
                        <SongRow track={item} key={item.uri}/>
                    ))};
                </div>   
                
            </div>)
    }}

export default Body