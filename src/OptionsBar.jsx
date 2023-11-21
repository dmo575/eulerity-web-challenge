import { useContext } from "react";
import { SelectionContext } from "./App";

function OptionsBar() {

    const { searchCards, setEditState, setOnDisplay, onDisplayRef, onDisplay } = useContext(SelectionContext);
    
    const handleSelectAll = () => {

        onDisplayRef.current.forEach((el, index) => {
            onDisplayRef.current[index].selected = true;
        });
        
        setEditState(prev => !prev);
    };
    
    const handleDeselect = () => {

        onDisplayRef.current.forEach((el, index) => {
            onDisplayRef.current[index].selected = false;
        });

        setEditState(prev => !prev);
    };

    const bubbleSort = (dir) => {

        // Instead of reordering the displayed elements array, we just modify the order value.
        // The reason is because the first approach takes much longer to complete.
        // My guess is that the first approach, as it is assigning new src to all the img tags
        // in the cards, is triggering some kind of processing of the images again (not re-downloading
        // them, but maybe some re-sizing and since they are so big they do take time).
        // With the second approach however, my guess is that the post processing/re-sizing of the images
        // doesnt trigger because the browser is smart enough to reuse that and ut just re-renders the
        // already final images in its correct place.
        // True or not, the difference between those two approaches is noticeable.
        // You can test the first approach if you comment out the code under Approach 2 - FAST
        // and uncomment the Approach 1 - SLOW and then go to the webpage and re-order the elements.
        // ^^ This is why I will leave the setOnDisplay function in the SelectionCOntext

        const arr = [...onDisplay];
        const arrRef = new Array(onDisplay.length).fill(0);
        
        let temp;
        let tempRef;

        arrRef.forEach((el, index) => {
            arrRef[index] = index;
        });

        for(let i = 0; i < arr.length; i++) {

            for(let n = 0; n < arr.length - i - 1; n++) {

                if(arr[n].title > arr[n+1].title) {
                    temp = arr[n];
                    tempRef = arrRef[n];
                    
                    arr[n] = arr[n+1];
                    arrRef[n] = arrRef[n+1];

                    arr[n+1] = temp;
                    arrRef[n+1] = tempRef;
                }
            }
        }

        // Approach 2 - FAST
        for(let i = 0; i < onDisplay.length; i++) {
            onDisplayRef.current[arrRef[i]].order = i * dir;
        }

        // Approach 1 - SLOW
        //setOnDisplay(arr);
    };

    const reorder = (event) => {
        if(event.target.value == "asc") {
            bubbleSort(1);
        }
        else if (event.target.value == "des") {
            bubbleSort(-1);
        }
        else {
            console.error(`Missing reorder implementation of ${event.target.value} on OptionsBar component`);
        }
        setEditState(prev => !prev);
    };

    return(
        <div className="options-bar-cont cont-style">
            <input className="options-input" placeholder="Type and press ENTER" type="text"></input>

            <label htmlFor="select-order">Order: </label>
            <select name="select-order" onChange={reorder} className="options-button">
                <option value="asc">Ascending</option>
                <option value="des">Descending</option>
            </select>



            <button onClick={handleSelectAll} className="options-button">Select all</button>
            <button onClick={handleDeselect} className="options-button">Deselect all</button>
            <button onClick={handleDeselect} className="options-button-download">Download</button>

        </div>
    );
}

export default OptionsBar;