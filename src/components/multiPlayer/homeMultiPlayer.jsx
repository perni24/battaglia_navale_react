import { useState } from "react";
import "./homeMultiPlayer.css";
import { fetchData } from "../../service";

function homeMultiPlayer({ state, nNavi }) {
  const lettere = "ABCDEFGHIJ".split("");
  const [arrNavi, setArrNavi] = useState([]);
  const [celleColpite, setCelleColpite] = useState([]);
  const [celleColpite2, setCelleColpite2] = useState([]);
  const [punteggio, setPunteggio] = useState({ p1: 0, p2: 0 });
  const [inputValues, setInputValues] = useState({
    playerName: "",
    roomName: "",
  }); // Stato per entrambi gli input
  const [statoCampo, setStatoCampo] = useState(0);

  const posizionaNave = (buttonId) => {
    if (arrNavi.length == nNavi - 1) {
      setState((prevState) => prevState + 1);
      setArrNavi([...arrNavi, buttonId]);
    } else {
      setArrNavi([...arrNavi, buttonId]);
    }
  };


  const generaStanza = async() =>{
    var dati = await fetchData()
  
    

    console.log(Object.keys(dati.data.stanze))
  }

  return (
    <>
      {statoCampo === 0 ? (
        <>
          <div className="inputContainer">
            <label>Player Name</label>
            <input
              type="text"
              name="playerName"
              value={inputValues.playerName}
              onChange={(e) =>
                setInputValues((prevState) => ({
                  ...prevState,
                  playerName: e.target.value,
                }))
              }
            />
            <label>Room Name</label>
            <input
              type="text"
              name="roomName"
              value={inputValues.roomName}
              onChange={(e) =>
                setInputValues((prevState) => ({
                  ...prevState,
                  roomName: e.target.value,
                }))
              }
            />
          </div>
          <div className="buttonContainer">
            <button
              // onClick={() => fetchData().then((ris) => console.log(ris.data))}
              onClick={() => generaStanza()}
              disabled={inputValues.playerName === "" || inputValues.roomName === ""}
              className={inputValues.playerName === "" || inputValues.roomName === "" ? "disabledButton" : ""}
            >
              genera stanza
            </button>
            <button
              onClick={() => setStatoCampo(1)}
              disabled={inputValues.playerName === "" || inputValues.roomName === ""}
              className={inputValues.playerName === "" || inputValues.roomName === "" ? "disabledButton" : ""}
            >
              unisciti
            </button>
          </div>
        </>
      ) : (
        <>
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
                                ? celleColpite2.includes(
                                    `${lettere[j]}${i + 1}`
                                  )
                                  ? "colpoNemico"
                                  : "cellaSelezionata"
                                : celleColpite2.includes(
                                    `${lettere[j]}${i + 1}`
                                  )
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
                              state == 2
                                ? (event) => attacco(event.target.id)
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
          </div>
        </>
      )}
    </>
  );
}

export default homeMultiPlayer;
