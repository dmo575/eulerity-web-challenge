import "./styles_card.css";
import { useState, useContext, useEffect, useRef } from "react";
import { SelectionContext } from "./App";

const cardSelectedColor = "rgb(0, 110, 255)";
const checkmark = "https://api.iconify.design/material-symbols-light:square.svg?color=%233584e4";
const loadingVisual = "https://api.iconify.design/eos-icons:bubble-loading.svg?color=%23ffffff";

function Card({data, index}) {
    // manages the selected state
    const [selected, setSelected] = useState(false);
    // monitors when the image has been loaded in the form of a state
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef(null);
    const { selectionRef, setFullscreen, fullscreen } = useContext(SelectionContext);

    // updates the selectionRef array contents
    const handleSelect = (event) => {

        
        // if selected, des-select. And vice-versa
        if(selected) {
            let index = selectionRef.current.indexOf(event.target.parentNode.id);
            selectionRef.current.splice(index, 1);
            event.target.parentNode.parentNode.classList.remove("card-container-selected");
        }
        else {
            selectionRef.current.push(event.target.parentNode.id);
            event.target.parentNode.parentNode.classList.add("card-container-selected");
        }
        // update the state, this triggers a re-render
        setSelected(prev => !prev);
    }

    const handleImgClick = (event) => {

        if(!fullscreen.open) {
            setFullscreen({open: true, index: index});
        }
    };

    useEffect(() => {
        //
        if(imgRef) {
            imgRef.current.onload = () => {
                setLoaded(true);
            };
        }
    }, []);

    return(
        <div id={`card-${index}`} className="card-container card-container-mobile" style={{"--selected-color": cardSelectedColor}}>
            {
                loaded || <img className="card-loading" src={loadingVisual}></img>
            }
            
            <img ref={imgRef} onClick={handleImgClick} id={`${data.title}-img`} className="card-img" src={data.url}></img>
            <div className="card-checkbox-container card-mobile" onClick={handleSelect} style={{"--selected-color": cardSelectedColor}}>
                <div className="card-checkbox">
                    <img className="card-checkbox-img" src={checkmark}></img>
                </div>
            </div>
        </div>
    );
}

export default Card;