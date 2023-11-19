import { useState, useRef, createContext } from 'react'
import useFetch from './useFetch'
import Button from './StyledButton';
import Card from './Card.jsx';
import ImageViewer from './ImageViewer.jsx';

const url = "https://eulerity-hackathon.appspot.com/pets";
const cardKeyPrefix = "card-";
export const SelectionContext = createContext();

function App() {

  const selectionRef = useRef([]);
  const [fullscreen, setFullscreen] = useState(-1);
  const data = useFetch(url);

  const renderData = (data) => {
    return(
      <form action="" className='selection-container'>
        {
          data.map((el, index) => <Card key={`${cardKeyPrefix}${index}`} data={el}/>)
        }
      </form>
    )
  };

  return (
    <div>
      <Button>Styled button</Button>
      <Button $primary>Primary styled button</Button>

      {data.status == "loading" && (<h1>Loading data</h1>)}
      {data.status == "error" && (<h1>{data.msg}</h1>)}
      <SelectionContext.Provider value={{selectionRef, setFullscreen}}>
        {data.status == "done" && renderData(data.data)}
      </SelectionContext.Provider>
      {fullscreen && <ImageViewer index={fullscreen} prefix={cardKeyPrefix}/>}
    </div>
  )
}

export default App