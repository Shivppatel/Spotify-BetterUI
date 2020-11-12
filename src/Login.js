import React from 'react';
import './Login.css';
import { loginUrl } from './spotify';
function Login() {
    return (
        <div className='login'>
            <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png' alt='spotify logo'/>
            <a href={loginUrl}>Login with Spotify</a>
            {/* Spotify Logo*/}
            {/* Login with Spotify button*/}
            
        </div>
    )
}

export default Login
