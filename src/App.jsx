import { useState, useRef, createContext, useEffect } from 'react'
import useFetch from './useFetch'
import Card from './Card.jsx';
import ImageViewer from './ImageViewer.jsx';
import OptionsBar from './OptionsBar.jsx';

const url = "https://eulerity-hackathon.appspot.com/pets";
export const SelectionContext = createContext();

function App() {

  // contains array of indexes of selected cards
  // const selectionRef = useRef([]);
  // contains the state of the window viewer
  const [fullscreen, setFullscreen] = useState({open: false, index: 0});
  // contains data of all the cards
  const data = useFetch(url);
  const dataRef = useRef(data);
  // the breakpoint state
  const [bp, setBp] = useState({size: "large"});
  // a reference to the breakpoint state
  const bpRef = useRef(bp);
  // a state that child components can call to trigger a re-render of every component using the SelectionContext
  const [editState, setEditState] = useState(false);
  // array of {data: {}, selected : boolean}
  const [onDisplay, setOnDisplay] = useState([]);
  const onDisplayRef = useRef([]);


  const handleResize = () => {

    // quick 2-level breakpoint so I can add some responsive features
    const w = window.innerWidth;
    
    if(w < 850 && bpRef.size != "small") {
      setBp({size: "small"});
    }
    else if(w < 1000 && bpRef.size != "medium") {
      setBp({size: "medium"});
    }
    else if(w >= 1000 && bpRef.size != "large") {
      setBp({size: "large"});
    }
  };

  useEffect(() => {

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [])

  // given a function "filter" that takes data about a card, updates the onDisplay array of cards' data
  // with all the data that passes that given function's test ("filter" must return T or F)
  const searchCards = (filter) => {

    // will store all data that passes the filter test
    const results = [];

    // for each data element, run the filter test on them and push it to results if it passes
    dataRef.current.data.forEach((el, index) => {
      if(filter(el, index)) {
        results.push(el);
      }
    });

    // update the onDisplayRef.current with default values
    onDisplayRef.current = Array.from({length: results.length}, () => {return {selected: false, order: 0}});

    // set initial order to be the index
    onDisplayRef.current.forEach((el, index) => {
      onDisplayRef.current[index].order = index;
    });

    // update the onDisplay data with the results cards
    setOnDisplay(results);

    // ^^ note that this makes it so that what connects the data from the onDisplayRef and onDisplay
    // arrays is the index.
  };

  useEffect(() => {
    // once we get the data, populate the onDisplay array with its initial value (all the cards)

    dataRef.current = data;
    // if the data has finished loading:
    if(data.status == "done") {
      searchCards(() => true);
    }

  }, [data]);


  
  // creates a card element for each entry in the onDisplay array
  const renderData = (data) => {
    return(
      <form action="" className='selection-container'>
        {
          data.map((el, index) => { return <Card key={`card-${index}`} cardIndex={index} data={el}/> })
        }
      </form>
    )
  };
  

  return (
    <>
      <SelectionContext.Provider value={{ setFullscreen, dataRef, fullscreen, setEditState, bp, onDisplay, setOnDisplay, searchCards, onDisplayRef }}>
    <OptionsBar/>
    <div className={`cont-style cont${bp.size == "small" && "-mobile" || ""}`}>
      {data.status == "loading" && (<h1 className='loading-data'>Loading data . . .</h1>)}
      {data.status == "error" && (<h1>{data.msg}</h1>)}
        {data.status == "done" && renderData(onDisplay)}
      {(fullscreen.open && data.status == "done") && 
      <ImageViewer index={fullscreen.index}/>}
    </div>
      </SelectionContext.Provider>
      </>
  )
}

export default App