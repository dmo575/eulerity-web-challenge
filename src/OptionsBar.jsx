import { useContext } from "react";
import { SelectionContext } from "./App";

function OptionsBar() {

    const {setEditState, selectionRef} = useContext(SelectionContext);

    const handleSelectAll = () => {
        // clear array
        selectionRef.current.splice(0, selectionRef.current.length);
        const count = document.querySelectorAll(".card-img").length;

        for(let i = 0; i < count; i++) {selectionRef.current[i] = i;}

        // we trigger a state change so that any component that also uses this context gets updated
        setEditState(prev => !prev);
    };

    const handleDeselect = () => {

        selectionRef.current.splice(0, selectionRef.current.length);
        setEditState(prev => !prev);
    };

    return(
        <div className="options-bar-cont cont-style">
            <input className="options-input" type="text"></input>

            <button onClick={handleSelectAll} className="options-button">Select all</button>
            <button onClick={handleDeselect} className="options-button">Deselect all</button>

        </div>
    );
}

export default OptionsBar;