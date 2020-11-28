import React from 'react';
import './Sidebar.css';
import SidebarOption from './SidebarOption';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import { useDataLayerValue } from '../DataLayer';


function Sidebar() {
    const [{playlists, selected}] = useDataLayerValue();    
    return (
        <div className='sidebar'>
            <img className="sidebar__logo" src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png' alt='spotify logo'/>
            < SidebarOption title="Home" Icon={ HomeIcon }type='home'/>
            < SidebarOption title="Search" Icon={ SearchIcon } type='search'/>
            < SidebarOption title="Your Library" Icon={ LibraryMusicIcon }  id={selected} type='id'/>
            <br/>
            <p className="sidebar__title">PLAYLISTS</p>
            < hr/>
            {playlists?.items?.map( playlist=> (
                <SidebarOption key={playlist.id} title={playlist.name} id={playlist.id} type="id"/>
                ))}
        </div>
    )
}

export default Sidebar
