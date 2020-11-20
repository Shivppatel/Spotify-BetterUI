import React from 'react'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './MobileSideBar.css'

function MobileSideBar() {
    return (
        <div className="mobile__sideBar">
            <ArrowForwardIosIcon className="mobile__menuIconExpand" fontSize="large"/>
            <ArrowBackIosIcon className="mobile__menuIconShrink" fontSize="large"/>
        </div>
    )
}

export default MobileSideBar
