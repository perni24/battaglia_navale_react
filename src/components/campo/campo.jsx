import React, { useState } from "react";
import "./campo.css";

function Campo({ state, setState, nNavi }) {
  const lettere = "ABCDEFGHIJ".split("");
  const [arrNavi, setArrNavi] = useState([]);
  const [arrNavi2, setArrNavi2] = useState();
  const [celleColpite, setCelleColpite] = useState([]);
  const [celleColpite2, setCelleColpite2] = useState([]);
  const [punteggio, setPunteggio] = useState({p1: 0, p2: 0})

  const posizionaNave = (buttonId) => {
    console.log(buttonId);
    if (arrNavi.length == nNavi - 1) {
      setState((prevState) => prevState + 1);
      setArrNavi([...arrNavi, buttonId]);
      naviPlayer2();
    } else {
      setArrNavi([...arrNavi, buttonId]);
    }
  };

  const naviPlayer2 = () => {
    let count = 0;
    let arr = [];
    while (count < 10) {
      let riga = Math.floor(Math.random() * 10) + 1;
      let colonna = lettere[Math.floor(Math.random() * 10)];
      let cella = `${colonna}${riga}`;

      if (!arr.includes(cella)) {
        arr.push(cella);
        count++;
      }
    }
    setArrNavi2(arr);
  };

  const checkPunto = (pn, buttonId) => {
    if (pn === 1) {
      if (arrNavi2.includes(buttonId)) {
        setPunteggio((prevPunteggio) => ({
          ...prevPunteggio,
          p1: prevPunteggio.p1 + 1
        }));
      }
    } else {
      if (arrNavi.includes(buttonId)) {
        setPunteggio((prevPunteggio) => ({
          ...prevPunteggio,
          p2: prevPunteggio.p2 + 1
        }));
      }
    }
  };
  

  const attacco = (buttonId) => {
    console.log(arrNavi2);
    if (arrNavi2.includes(buttonId)) {
        let obj = { id: buttonId, val: 1 };
        setCelleColpite([...celleColpite, obj])
        checkPunto(1,buttonId)
        attaccoPlayer2()
    } else {
        let obj = { id: buttonId, val: 0 };
        setCelleColpite([...celleColpite, obj])
        checkPunto(1,buttonId)
        attaccoPlayer2()
    }
  };

  const attaccoPlayer2 = () => {
    let controllo = false
    let arr = celleColpite2
    while(controllo == false){
    let riga = Math.floor(Math.random() * 10) + 1;
    let colonna = lettere[Math.floor(Math.random() * 10)];
    let cella = `${colonna}${riga}`;
    if(!arr.includes(cella)){
      setCelleColpite2([...celleColpite2,cella])
      controllo = true
      checkPunto(2,cella)
      arr.push(cella)
      }
    }
  }

  return (
    <div className="campoContainer">
      <div className="tableContainer">
        <p>player 1 : {punteggio.p1}</p>
        <p>campo player</p>
        <table className={state == 2 ? "blockTab" : ""}>
          <thead>
            <tr>
              <th> </th>
              {lettere.map((item) => (
                <th key={item}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lettere.map((rowLetter, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                {lettere.map((columnLetter, j) => (
                  <th key={`${i}-${j}`}>
                    <button
                      className={
                        arrNavi.includes(`${lettere[j]}${i + 1}`)
                          ? celleColpite2.includes(`${lettere[j]}${i + 1}`) ? "colpoNemico" : "cellaSelezionata"
                          : celleColpite2.includes(`${lettere[j]}${i + 1}`) ? "colpoNemico" : "cella"
                      }
                      id={`${lettere[j]}${i + 1}`}
                      onClick={
                        state == 1
                          ? (event) => posizionaNave(event.target.id)
                          : null
                      }
                    ></button>
                  </th>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* campo 2 */}
      <div className="tableContainer">
        <p>player 2 : {punteggio.p2}</p>
        <p>campo attacco</p>
        <table>
          <thead>
            <tr>
              <th> </th>
              {lettere.map((item) => (
                <th key={item}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lettere.map((rowLetter, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                {lettere.map((columnLetter, j) => (
                  <th key={`${i}-${j}`}>
                    <button
                      className={
                        celleColpite.some((item) => item.id === `${lettere[j]}${i + 1}` && item.val === 1)
                          ? "naveColpita"
                          : celleColpite.some((item) => item.id === `${lettere[j]}${i + 1}` && item.val === 0) 
                          ? "naveMancata"
                          : "cella"
                      }                      
                      id={`${lettere[j]}${i + 1}`}
                      onClick={
                        state == 2 ? (event) => attacco(event.target.id) : null
                      }
                    ></button>
                  </th>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Campo;
