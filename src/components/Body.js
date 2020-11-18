import React from 'react';
import { useDataLayerValue } from '../DataLayer';
import './Body.css';
import Header from './Header';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SongRow from './SongRow'

function Body({ spotify}) {
    const [{top_playlist }, dispatch] = useDataLayerValue();
    return (
        <div className='body'>
            <Header spotify={spotify}/>
            <div className="body__info">
                <img src={top_playlist?.images[0].url} alt=""/>
                <div className="body__infoText">
                    <stong>PLAYLISTS</stong>
                    <h2>{top_playlist?.name}</h2>
                    <p>{top_playlist?.description}</p>
                </div>
            </div>
            <div className="body__songs">
                <div className="body__icons">
                    <PlayCircleFilledIcon className="body__suffle" />
                    <FavoriteIcon fontSize="large" />
                    <MoreHorizIcon />
                </div>
                {top_playlist?.tracks.items.map((item) => (
                    <SongRow track={item.track}/>
                ))};
            </div>
        </div>
    )
}

export default Body
