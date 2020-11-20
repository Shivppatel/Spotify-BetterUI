import React from 'react'
import './Player.css';
import Sidebar from './Sidebar';
import MobileSideBar from './MobileSideBar';
import Body from './Body';
import Footer from './Footer';

function Player({ spotify }) {
    return (
        <div className='player'>
            <div className='player__body'>
                < Sidebar className="sidebar"/>
                <MobileSideBar className="modible_sideBar"/>
                < Body spotify={spotify}/>
            </div>
            < Footer spotify={spotify}/>
        </div>
    )
}

export default Player
