import "./styles_card.css";
import { useState, useContext, useEffect, useRef } from "react";
import { SelectionContext } from "./App";

const cardSelectedColor = "rgb(0, 110, 255)";
const checkmark = "https://api.iconify.design/material-symbols-light:square.svg?color=%233584e4";
const loadingVisual = "https://api.iconify.design/eos-icons:bubble-loading.svg?color=%23ffffff";

function Card({data, cardIndex}) {

    // references to inner elements
    const imgRef = useRef(null);
    const cardRef = useRef(null);

    // monitors when the image has been loaded in the form of a state
    const [loaded, setLoaded] = useState(false);

    const { setFullscreen, fullscreen, bp, searchCards, onDisplay, onDisplayRef } = useContext(SelectionContext);

    // when rendering, make sure to apply the correct styling based on selection
    // when interacting with checkbox, make sure to update selection state
    // 

    useEffect(() => {
        updateSelection();
    });

    // check selected status and apply proper styling
    const updateSelection = () => {

        if(onDisplayRef.current[cardIndex].selected) {
            cardRef.current.classList.add("card-container-selected");
        }
        else {
            cardRef.current.classList.remove("card-container-selected");
        }
        console.log(onDisplayRef.current);
    }

    // select / deselect on click
    const handleCheckbox = () => {
        onDisplayRef.current[cardIndex].selected = !(onDisplayRef.current[cardIndex].selected);
        updateSelection();
    };

    // call image viewer on click
    const handleImgClick = () => {

        if(!fullscreen.open) {
            setFullscreen({open: true, index: cardIndex});
        }
    };

    // on mount
    useEffect(() => {

        // if the image has finished loading, se its load state to true
        if(imgRef) {
            imgRef.current.onload = () => {
                setLoaded(true);
            };
        }
    }, []);



    return(
        <div id={`card-${cardIndex}`} ref={cardRef} className={`${bp.size == "large" ? "card-container" : "card-container-mobile"}`} style={{"--selected-color": cardSelectedColor}}>
            {
                loaded || <img className="card-loading" src={loadingVisual}></img>
            }
            
            <img ref={imgRef} onClick={handleImgClick} id={`${data.title}-img`} className="card-img" src={data.url}></img>
            <div className={bp.size == "large" ? "card-checkbox-container" : "card-checkbox-container card-mobile"} test="card-checkbox-container card-mobile" onClick={handleCheckbox} style={{"--selected-color": cardSelectedColor}}>
                <div className="card-checkbox">
                    <img className="card-checkbox-img" src={checkmark}></img>
                </div>
            </div>
        </div>
    );
}

export default Card;