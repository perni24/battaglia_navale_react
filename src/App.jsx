import { useState } from 'react';
import './App.css';
import Campo from './components/campo/campo';
import StartPage from './components/startPage/startPage';
import EndPage from './components/endPage/endPage';
import HomeMultiPlayer from './components/multiPlayer/homeMultiPlayer';

function App() {
  const [statoPagina, setStatoPagina] = useState(0);
  const [mod, setMod] = useState(0);

  const navi = 10

  return (
    <div className='appContainer'>
    {statoPagina === 0 ? 
        <StartPage state={statoPagina} setState={setStatoPagina} modalita={mod} setModalita = {setMod}/>
      : statoPagina === 1 && mod === 1 || statoPagina === 2  && mod === 1 ?
      <Campo state={statoPagina} setState={setStatoPagina} nNavi={navi}/>
      : statoPagina === 1 && mod === 2 || statoPagina === 2  && mod === 2 ?
      <HomeMultiPlayer state={statoPagina} setState={setStatoPagina} nNavi={navi}/>
      :<EndPage state={statoPagina}></EndPage>
    }
      </div>
  );
}

export default App;
