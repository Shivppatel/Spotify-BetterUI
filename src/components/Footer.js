import {React, useState} from 'react';
import './Footer.css'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
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
    const [{ token, item, playing, currentState }, dispatch] = useDataLayerValue();

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    function Suffle(){
      spotify.getMyCurrentPlaybackState().then((response) => {
        if(response.shuffle_state === false){
          spotify.setShuffle(true);
        } else {
          spotify.setShuffle(false);
        }
      })
      updatePlaying();
      

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
          updatePlaying();
        })
      }
      updatePlaying();
    };
    async function SkipNext(){
      spotify.skipToNext();
      updatePlaying();
      

    };
    function Repeat(){
      spotify.getMyCurrentPlaybackState().then((response) => {
        if(response.repeat_state === 'off'){
          spotify.setRepeat('track');
        } else {
          spotify.setRepeat('off');
        }
      })
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

    function handleSliderChange(input_value){
      
    };

    return (
      <div className='footer' time>
      <div className="footer__left">
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
                <ShuffleIcon className="footer__green" onClick={Suffle}/>
                <SkipPreviousIcon className="footer__icon" onClick={SkipPrev}/>
                {currentState!==true? (< PlayCircleOutlineIcon fontSize="large" className="footer__icon" onClick={Play}/>) : (< PauseCircleFilledIcon fontSize="large" className="footer__icon" onClick={Pause}/>)}
                <SkipNextIcon className="footer__icon" onClick={SkipNext}/>
                <RepeatIcon className="footer__green" onClick={Repeat}/>
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
                            getAriaValueText={((value) => {handleSliderChange(value);})}
                            aria-labelledby="input-slider"
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer
