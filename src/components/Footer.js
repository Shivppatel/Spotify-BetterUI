import {React, useState} from 'react';
import './Footer.css'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import { Grid, Slider } from "@material-ui/core";
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import { useDataLayerValue } from "../DataLayer";
import SpotifyWebApi from 'spotify-web-api-js';
const spotify = new SpotifyWebApi();

function Footer() {
    const [{item, playing, currentState }, dispatch] = useDataLayerValue();
    const [suffle, setShuffle] = useState(false);
    const [replay, setReplay] = useState(false);
    const [favorite, setFavorite] = useState(false);

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    function Suffle(){
      if({suffle}['suffle']){
        spotify.setShuffle(false);
        setShuffle(!suffle);
      } else {
        spotify.setShuffle(true);
        setShuffle(!suffle);
      }
    };

    async function SkipPrev(){
      spotify.skipToPrevious();
      updatePlaying();

    };
    async function Play(){
      if(currentState===undefined || currentState===false){
        spotify.play(item?.uri).catch(e => {
          console.log('Already Playing!');
        })
      }
      updatePlaying();
    };
 
    async function Pause(){
      if(currentState === true ){
        spotify.pause(playing).catch(e => {
          console.log('Already Paused!');
        })
      }
      updatePlaying();
    };
    async function SkipNext(){
      spotify.skipToNext();
      updatePlaying();
      

    };
    function Repeat(){
      if({replay}['replay']){
        spotify.setRepeat('off');
        setReplay(!replay);
      } else {
        spotify.setRepeat('track');
        setReplay(!replay);
      }
    };

    async function updatePlaying(){
      await sleep(1000);
      spotify.getMyCurrentPlaybackState().then((response) => {
        dispatch({
          type:'SET_PLAYING',
          playing: response,
          currentState: response.is_playing,
        })
        setShuffle(response);
        if(response.repeat_state === 'off'){
          setReplay(false);
        } else {
          setReplay(true);
        }
        })
        getFavoriteStatus();
    };

     function Favorite(){
      if(favorite){
        spotify.removeFromMySavedTracks([playing.item.id]);
      } else {
        spotify.addToMySavedTracks([playing.item.id]);
      }
      getFavoriteStatus();
    }

    function getFavoriteStatus(){
      spotify.containsMySavedTracks([playing.item.id]).then((response) => {
        if(response[0]===false){
          setFavorite(false);
        } else {
          setFavorite(true);
        }
      })
    };

    return (
      <div className='footer' time>
      <div className="footer__left">
         <div>
            <FavoriteIcon className={"footer__songFavorite_"+favorite} onClick={Favorite}/>
          </div>
        <img
          className="footer__albumLogo"
          src={playing.item?.album.images[0].url}
          alt={playing.item?.name}
        />
        {playing ? (
          <div className="footer__songInfo">
            <h4>{playing.item.name}</h4>
            <p>{playing.item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>
            <div className="footer__middle">
                <ShuffleIcon className={'footer__green_'+suffle} onClick={Suffle}/>
                <SkipPreviousIcon className="footer__icon" onClick={SkipPrev}/>
                {currentState!==true? (< PlayCircleOutlineIcon fontSize="large" className="footer__icon" onClick={Play}/>) : (< PauseCircleFilledIcon fontSize="large" className="footer__icon" onClick={Pause}/>)}
                <SkipNextIcon className="footer__icon" onClick={SkipNext}/>
                <RepeatIcon className={'footer__green_'+replay} onClick={Repeat}/>
            </div>
            <div className="footer__right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider
                            aria-labelledby="input-slider"
                            disabled='true'
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer
