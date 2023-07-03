import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from '../images/brain-icon.png';

const Logo = () => {
    return (
        <Tilt>
            <div className='logo br2'>
                <img alt='logo' src={brain} />
            </div>
        </Tilt>
    )
}

export default Logo;