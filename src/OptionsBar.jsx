import { useContext } from "react";
import { SelectionContext } from "./App";

function OptionsBar() {

    return (<p>closed</p>);
    const {setEditState, selectionRef, setOnDisplay} = useContext(SelectionContext);

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

    const reorder = () => {
        setOnDisplay([2,1,4,5,3,6,7,8,9,5,1,5,4,8,7,5,9,8,1,2,4,5,4,8,5,6,3]);
    };

    return(
        <div className="options-bar-cont cont-style">
            <input className="options-input" placeholder="Type and press ENTER" type="text"></input>

            <label htmlFor="select-order">Order: </label>
            <select name="select-order" onChange={reorder} className="options-button">
                <option value="A-Z">Ascending</option>
                <option value="Z-A">Descending</option>
            </select>



            <button onClick={handleSelectAll} className="options-button">Select all</button>
            <button onClick={handleDeselect} className="options-button">Deselect all</button>
            <button onClick={handleDeselect} className="options-button-download">Download</button>

        </div>
    );
}

export default OptionsBar;