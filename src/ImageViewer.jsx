import { useEffect, useState, useRef, useContext } from "react";
import { SelectionContext } from "./App";

function ImageViewer({index}) {

    const imgRef = useRef();
    const [currIndex, setCurrIndex] = useState(index);
    const { setFullscreen } = useContext(SelectionContext);

    useEffect(() => {
        const srcElement = document.querySelector(`#card-${index}`)?.querySelector(".card-img");
        imgRef.current.src = srcElement.src;
        console.log(imgRef.current.src);
    }, []);

    //const closeViewport = () => {
    //    setFullscreen({open: false});
    //}

    return(
        <div className="image-viewer">
            <img ref={imgRef} className="img-viewer-img"></img>
        </div>
    )
}

export default ImageViewer;