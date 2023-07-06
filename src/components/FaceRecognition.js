import React from "react";

const FaceRecognition = ({imageUrl, box}) => {
    return (
        <div className="center img-holder">
            <img id='input-image' alt="" src={imageUrl} />
            <div className="bounding-box">
                sj
            </div>
         </div>
    )
}

export default FaceRecognition;