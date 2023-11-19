import { useState, useRef, createContext, useEffect } from 'react'
import useFetch from './useFetch'
import Button from './StyledButton';
import Card from './Card.jsx';
import ImageViewer from './ImageViewer.jsx';

const url = "https://eulerity-hackathon.appspot.com/pets";
export const SelectionContext = createContext();

function App() {

  const selectionRef = useRef([]);
  const [fullscreen, setFullscreen] = useState({open: false, index: 0});
  const data = useFetch(url);
  const [bp, setBp] = useState({size: "large"});
  const bpRef = useRef(bp);

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
    <div>
      {data.status == "loading" && (<h1>Loading data</h1>)}
      {data.status == "error" && (<h1>{data.msg}</h1>)}
      <SelectionContext.Provider value={{selectionRef, setFullscreen, fullscreen, bp}}>
        {data.status == "done" && renderData(data.data)}
      {(fullscreen.open && data.status == "done") && 
      <ImageViewer cards={data.data} index={fullscreen.index}/>}
      </SelectionContext.Provider>
    </div>
      </>
  )
}

export default App