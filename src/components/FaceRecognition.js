import React from "react";

const FaceRecognition = ({imageUrl}) => {
    return (
        <div className="center img-holder">
            <img id='inputimage' alt="" src={imageUrl} />
        </div>
    )
}

export default FaceRecognition;