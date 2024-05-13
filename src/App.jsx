import { useState } from 'react';
import './App.css';
import Campo from './components/campo/campo';
import StartPage from './components/startPage/startPage';

function App() {
  const [statoPagina, setStatoPagina] = useState(0);

  const navi = 10

  return (
    <div className='appContainer'>
    {statoPagina === 0 ? 
        <StartPage state={statoPagina} setState={setStatoPagina}/>
      :
      <Campo state={statoPagina} setState={setStatoPagina} nNavi={navi}/>}
      </div>
  );
}

export default App;
