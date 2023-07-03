import React from "react";

const ImageLinkForm = () => {
    return (
        <div className='ma4 mt0'>
            <p className='f3'>
                {'The magic brain will detect faces in your images'}
            </p>
            <div className="center">
                <div className="form pa5 br3 shadow-5 center">
                    <input type="text" className="f4 pa2 w-70 center" />
                    <button className="w-30 f4 link ph3 pv2 dib white grow pa2 bg-light-purple">Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;