import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';

function Header() {
    let [window_width, updateWindowWidth] = useState(window.innerWidth);
    window.addEventListener('resize', () => {
        updateWindowWidth(window.innerWidth);
    })
    let [toggleNavbar, updateToggleNavbar] = useState(false);
    return (
        <>
            <header>
                <DehazeIcon className={`${window_width < 786 ? "display_flex" : "display_none"}`} onClick={() => { updateToggleNavbar(true) }} />
                <div className="header">
                    <h1>
                        <NavLink to="/">Math Helper</NavLink>
                    </h1>
                </div>
                <div className=""></div>
                <div className=""></div>
                <nav className={`DesktopNav ${window_width > 786 ? "display_flex" : "display_none"}`}>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/references">References</NavLink>
                </nav>
                <nav className={`MobileNav ${toggleNavbar ? "display_flex" : ""}`}>
                    <CloseIcon onClick={() => { updateToggleNavbar(false) }} />
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/references">References</NavLink>
                </nav>
            </header>
        </>
    )
}

export default Header