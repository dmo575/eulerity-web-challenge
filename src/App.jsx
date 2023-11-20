import { useState, useRef, createContext, useEffect } from 'react'
import useFetch from './useFetch'
import Card from './Card.jsx';
import ImageViewer from './ImageViewer.jsx';
import OptionsBar from './OptionsBar.jsx';

const url = "https://eulerity-hackathon.appspot.com/pets";
export const SelectionContext = createContext();

function App() {

  const selectionRef = useRef([]);
  const [fullscreen, setFullscreen] = useState({open: false, index: 0});
  const data = useFetch(url);
  const [bp, setBp] = useState({size: "large"});
  const bpRef = useRef(bp);
  const [editState, setEditState] = useState(false);

  const handleResize = () => {

    // quick 2-level breakpoint so I can add some responsive features
    const w = window.innerWidth;
    
    if(w < 850 && bpRef.size != "small") {
      setBp({size: "small"});
    }
    else if(w >= 850 && bpRef.size != "large") {
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

  const renderData = (data) => {
    return(
      <form action="" className='selection-container'>
        {
          data.map((el, index) => { return <Card key={`card-${index}`} index={index} data={el}/> })
        }
      </form>
    )
  };

  return (
    <>
      <SelectionContext.Provider value={{selectionRef, setFullscreen, fullscreen, setEditState, bp}}>
    <OptionsBar/>
    <div className='cont-style cont'>
      {data.status == "loading" && (<h1>Loading data</h1>)}
      {data.status == "error" && (<h1>{data.msg}</h1>)}
        {data.status == "done" && renderData(data.data)}
      {(fullscreen.open && data.status == "done") && 
      <ImageViewer cards={data.data} index={fullscreen.index}/>}
    </div>
      </SelectionContext.Provider>
      </>
  )
}

export default App