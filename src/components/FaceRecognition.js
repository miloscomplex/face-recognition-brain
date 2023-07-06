import React from "react";

const FaceRecognition = ({imageUrl, box}) => {
    return (
        <div className="center img-holder">
            <div className="absolute">
                <img id='input-image' alt="" src={imageUrl} />
                <div className="bounding-box" style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
                </div>
            </div>
         </div>
    )
}

export default FaceRecognition;