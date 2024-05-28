import { useState } from 'react';
import './App.css';
import Campo from './components/campo/campo';
import StartPage from './components/startPage/startPage';
import EndPage from './components/endPage/endPage';

function App() {
  const [statoPagina, setStatoPagina] = useState(0);

  const navi = 10

  return (
    <div className='appContainer'>
    {statoPagina === 0 ? 
        <StartPage state={statoPagina} setState={setStatoPagina}/>
      : statoPagina === 1 || statoPagina === 2 ?
      <Campo state={statoPagina} setState={setStatoPagina} nNavi={navi}/>
      : <EndPage state={statoPagina}></EndPage>
    }
      </div>
  );
}

export default App;
