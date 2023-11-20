import "./styles_card.css";
import { useState, useContext, useEffect, useRef } from "react";
import { SelectionContext } from "./App";

const cardSelectedColor = "rgb(0, 110, 255)";
const checkmark = "https://api.iconify.design/material-symbols-light:square.svg?color=%233584e4";
const loadingVisual = "https://api.iconify.design/eos-icons:bubble-loading.svg?color=%23ffffff";

function Card({data, index: cardIndex}) {
    // monitors when the image has been loaded in the form of a state
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef(null);
    const cardRef = useRef(null);
    const { selectionRef, setFullscreen, fullscreen, bp } = useContext(SelectionContext);

    const isSelected = () => {
        return selectionRef.current.some(el => el == cardIndex);
    }

    useEffect(() => {
        updateSelection();
    });

    // updates the styling of the card based on whether it is selected or not.
    const updateSelection = () => {

        if(isSelected()) {
            cardRef.current.classList.add("card-container-selected");
        }
        else {
            cardRef.current.classList.remove("card-container-selected");
        }
    }

    const interact = () => {

        if(isSelected()) {
            let i = selectionRef.current.indexOf(cardIndex);
            selectionRef.current.splice(i, 1);
        }
        else {
            selectionRef.current.push(cardIndex);
        }

        updateSelection();
    };

    const handleImgClick = () => {

        if(!fullscreen.open) {
            setFullscreen({open: true, index: cardIndex});
        }
    };

    useEffect(() => {

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
            <div className={bp.size == "large" ? "card-checkbox-container" : "card-checkbox-container card-mobile"} test="card-checkbox-container card-mobile" onClick={interact} style={{"--selected-color": cardSelectedColor}}>
                <div className="card-checkbox">
                    <img className="card-checkbox-img" src={checkmark}></img>
                </div>
            </div>
        </div>
    );
}

export default Card;