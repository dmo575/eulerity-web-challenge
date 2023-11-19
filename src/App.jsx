import { useState, useRef, createContext } from 'react'
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

  const renderData = (data) => {
    return(
      <form action="" className='selection-container'>
        {
          data.map((el, index) => <Card key={`card-${index}`} index={index} data={el}/>)
        }
      </form>
    )
  };

  return (
    <>
    <div>
      {data.status == "loading" && (<h1>Loading data</h1>)}
      {data.status == "error" && (<h1>{data.msg}</h1>)}
      <SelectionContext.Provider value={{selectionRef, setFullscreen, fullscreen}}>
        {data.status == "done" && renderData(data.data)}
      </SelectionContext.Provider>
    </div>
      {(fullscreen.open && data.status == "done") && 
      <ImageViewer index={fullscreen.index}/>}
      </>
  )
}

export default App