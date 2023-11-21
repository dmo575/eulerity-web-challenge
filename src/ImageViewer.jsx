import { useEffect, useState, useRef, useContext } from "react";
import { SelectionContext } from "./App";

const arrowLeft = "https://api.iconify.design/material-symbols:arrow-back-ios-new.svg?color=%23ffffff";
const arrowRight = "https://api.iconify.design/material-symbols:arrow-forward-ios.svg?color=%23ffffff";
const close = "https://api.iconify.design/material-symbols:close-small-outline.svg?color=%23ffffff";

function ImageViewer({cards, index}) {

    const imgRef = useRef();
    const [currIndex, setCurrIndex] = useState(index);
    const { setFullscreen, onDisplayRef, onDisplay } = useContext(SelectionContext);

    useEffect(() => {
        
        // we find out which card has the order we 
        let cardIndex = 0;
        for(let i = 0; i < onDisplayRef.current.length; i++) {
            if(onDisplayRef.current[i].order == currIndex) {
                cardIndex = i;
                break;
            }
        }

        imgRef.current.src = onDisplay[cardIndex].url;
    });

    const closeViewport = () => {
        setFullscreen({open: false});
    }
    
    const goNext = () => {setCurrIndex(currIndex+1 >= onDisplay.length ? 0 : currIndex+1)};
    const goPrev = () => {setCurrIndex(currIndex-1 < 0 ? onDisplay.length-1: currIndex-1)};


    return(
        <div className="image-viewer-cont">
            <div className="image-viewer">
                <img ref={imgRef} className="img-viewer-img"></img>
                {/* controls below */}
                <img src={close} className="img-viewer-button-close" onClick={closeViewport} ></img>
                <div className="img-viewer-controls">
                    <img className="img-viewer-button" onClick={goPrev} src={arrowLeft} alt="Go to previous image" />
                    <img className="img-viewer-button" onClick={goNext} src={arrowRight} alt="Go to next image" />
                </div>
            </div>
        </div>
    )
}

export default ImageViewer;