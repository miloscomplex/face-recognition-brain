import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
        <nav>
            <p className="f3 link dim black underline pa3 pointer" onClick={ () => onRouteChange('signout')}>Sign Out</p>
        </nav>
        )
    } else {
        return (
        <nav>
            <p className="f3 link dim black underline pa3 pointer" onClick={ () => onRouteChange('register')}>Register</p>
            <p className="f3 link dim black underline pa3 pointer" onClick={ () => onRouteChange('signin')}>Sign-in</p>
        </nav> 
        )
    }
}

export default Navigation