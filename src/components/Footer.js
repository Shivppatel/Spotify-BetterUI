import React from 'react';
import './Footer.css'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
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
    const [{ token, item, playing }, dispatch] = useDataLayerValue();
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    function Suffle(){
      spotify.setShuffle();

    };
    async function SkipPrev(){
      spotify.skipToPrevious();
      await sleep(500);
      updatePlaying();

    };
    function Play(){
      const link = playing.uri;
      spotify.play(link);
    };
    async function SkipNext(){
      spotify.skipToNext();
      await sleep(500);
      updatePlaying();
      

    };
    function Repeat(){
      spotify.setRepeat();

    };
    function updatePlaying(){
      spotify.getMyCurrentPlayingTrack().then((response) => {
        dispatch({
          type:'SET_PLAYING',
          playing: response,
        })
      })
    }

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
                <PlayCircleOutlineIcon fontSize="large" className="footer__icon" onClick={Play}/>
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
                        <Slider />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer
