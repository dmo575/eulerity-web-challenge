import { useContext, useRef, useEffect } from "react";
import { SelectionContext } from "./App";

function OptionsBar() {

    const inputBoxRef = useRef();
    const { searchCards, setEditState, bp, dataRef, setOnDisplay, onDisplayRef, onDisplay } = useContext(SelectionContext);
    
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


    const handleSearch = (t, query, d) => {

        const qArr = query.split(" ");
        const results = [];

        d.current.data.forEach((el, index) => {
            // for each data element we have:
            // (data: an array of titles or descriptions)

            for(let i = 0; i < qArr.length; i++) {
                // for each word in our search query

                if(el[t].toLowerCase().includes(qArr[i].toLowerCase())) {
                    // if the data element contains any word in our query:

                    results.push(index);
                }
            }
        });

        // we call the search array and as a filter we pass a function that returns true if the index of the element
        // is contained within our results array.
        searchCards((el, index) => results.includes(index));
    };

    const bubbleSort = (dir) => {

        // Instead of reordering the displayed elements array, we just modify the order value.
        // The reason is because the first approach takes much longer to complete.
        // My guess is that the first approach, as it is assigning new src to all the img tags
        // in the cards, is triggering some kind of processing of the images again (not re-downloading
        // them, but maybe some re-sizing and since they are so big it takes time).
        // With the second approach however, my guess is that the post processing/re-sizing of the images
        // doesn't trigger because the browser is smart enough to reuse that and ut just re-renders the
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

        // bubble sort O(n^2)
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

    useEffect(() => {

        const handleEnter = (event) => {

            const keyVal = event.key.toLowerCase();
            if( keyVal >= "a" &&  keyVal <= "z" || keyVal >= 0 &&  keyVal <= 9 || event.key == "Backspace") {

                const val = document.querySelector(`input[name="searchType"]:checked`);

                // pass in type or title if none selected
                console.log(`value is: ${event.target.value}`)
                handleSearch(val?.value || "title", event.target.value || " ", dataRef);
            }
        };

        inputBoxRef.current.addEventListener("keyup", handleEnter);

        return () => {
            inputBoxRef.current.addEventListener("keyup", handleEnter)
        };

    }, [inputBoxRef]);

    return(
        <div className={`options-bar-cont cont-style`}>
            <div className={`sub-search ${bp.size != "large" && "sub-search-mobile"}`}>
                <div className="search-by-cont">
                    <p>Search by: </p>
                    <div>
                        <div>
                            <input type="radio" name="searchType" value={"title"} id="op1" />
                            <label htmlFor="op1">Title</label>
                        </div>
                        <input type="radio" name="searchType" value={"description"} id="op2" />
                        <label htmlFor="op2">Description</label>
                    </div>
                </div>
                <input ref={inputBoxRef} className="options-input" placeholder="Type to search" type="text"></input>
            </div>

            <div className={`sub-buttons ${bp.size != "large" && "sub-buttons-mobile"}`}>
                <select name="select-order" defaultValue={"default"} onChange={reorder} className="options-button">
                    <option disabled value="default">Order</option>
                    <option value="asc">Ascending</option>
                    <option value="des">Descending</option>
                </select>

                <button onClick={handleSelectAll} className="options-button">Select all</button>
                <button onClick={handleDeselect} className="options-button">Deselect all</button>
                <button onClick={handleDeselect} className="options-button-download">Download</button>
            </div>
        </div>
    );
}

export default OptionsBar;