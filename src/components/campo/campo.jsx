import React, { useState, useEffect } from "react";
import "./campo.css";

function Campo({ state, setState, nNavi }) {
  const lettere = "ABCDEFGHIJ".split("");
  const [arrNavi, setArrNavi] = useState([]);
  const [arrNavi2, setArrNavi2] = useState();
  const [celleColpite, setCelleColpite] = useState([]);
  const [celleColpite2, setCelleColpite2] = useState([]);
  const [punteggio, setPunteggio] = useState({ p1: 0, p2: 0 });

  useEffect(() => {
    checkVittoria();
  }, [punteggio]);

  const posizionaNave = (buttonId) => {
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
    let colonna;
    let riga = 0;
    let cella = "";
    while (count < 10) {
      if (count % 2 === 0) {
        riga = Math.floor(Math.random() * 10) + 1;
        colonna = lettere[Math.floor(Math.random() * 10)];
        cella = `${colonna}${riga}`;

        if (!arr.includes(cella)) {
          arr.push(cella);
          count++;
        }
      } else {
        let colonnaAd
        let rigaAd
        // su =  0 giu = 1 destra = 2 sinistra = 3
        let direzione = Math.floor(Math.random() * 4);
        switch (direzione) {
          case 0:
            if(riga != 1){
              colonnaAd = colonna;
              rigaAd = riga - 1;
              cella = `${colonnaAd}${rigaAd}`;
            }
            break;
          case 1:
            if(riga != 10){
              colonnaAd = colonna;
              rigaAd = riga + 1;
              cella = `${colonnaAd}${rigaAd}`;
            }
            break;
          case 2:
            if(colonna != "J"){
              colonnaAd = lettere[lettere.indexOf(colonna) + 1];
              rigaAd = riga;
              cella = `${colonnaAd}${rigaAd}`;
            }
            break;
          case 3:
            if (colonna != "A"){
              colonnaAd = lettere[lettere.indexOf(colonna) - 1];
              rigaAd = riga;
              cella = `${colonnaAd}${rigaAd}`;
            }
            break;
        }
        if (!arr.includes(cella)) {
          arr.push(cella);
          count++;
        }
      }
    }
    setArrNavi2(arr);
  };

  const checkPunto = (buttonId) => {
    if (arrNavi.includes(buttonId)) {
      setPunteggio((prevPunteggio) => ({
        ...prevPunteggio,
        p2: prevPunteggio.p2 + 1,
      }));
    }
  };

  const checkVittoria = () => {
    if (punteggio.p1 === 10) {
      setState((prevState) => prevState + 1);
    }
    if (punteggio.p2 === 10) {
      setState((prevState) => prevState + 2);
    }
  };

  const attacco = (buttonId) => {
    console.log(arrNavi2);
    if (arrNavi2.includes(buttonId)) {
      let obj = { id: buttonId, val: 1 };
      setCelleColpite([...celleColpite, obj]);
      setPunteggio((prevPunteggio) => ({
        ...prevPunteggio,
        p1: prevPunteggio.p1 + 1,
      }));
      attaccoPlayer2();
    } else {
      let obj = { id: buttonId, val: 0 };
      setCelleColpite([...celleColpite, obj]);
      attaccoPlayer2();
    }
  };

  const attaccoPlayer2 = () => {
    let controllo = false;
    let arr = celleColpite2;
    while (controllo == false) {
      let riga = Math.floor(Math.random() * 10) + 1;
      let colonna = lettere[Math.floor(Math.random() * 10)];
      let cella = `${colonna}${riga}`;
      if (!arr.includes(cella)) {
        setCelleColpite2([...celleColpite2, cella]);
        controllo = true;
        checkPunto(cella);
      }
    }
  };

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
                          ? celleColpite2.includes(`${lettere[j]}${i + 1}`)
                            ? "colpoNemico"
                            : "cellaSelezionata"
                          : celleColpite2.includes(`${lettere[j]}${i + 1}`)
                          ? "colpoNemico"
                          : "cella"
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
                        celleColpite.some(
                          (item) =>
                            item.id === `${lettere[j]}${i + 1}` &&
                            item.val === 1
                        )
                          ? "naveColpita"
                          : celleColpite.some(
                              (item) =>
                                item.id === `${lettere[j]}${i + 1}` &&
                                item.val === 0
                            )
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
