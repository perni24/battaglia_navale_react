import "./startPage.css";

function StartPage({ state, setState , modalita, setModalita}) {
  const buttonSingle = () => {
    setState((prevState) => prevState + 1);
    setModalita((prevState) => prevState + 1);
    console.log(state);
  };

  const buttonMulti = () => {
    setState((prevState) => prevState + 1);
    setModalita((prevState) => prevState + 2);
    console.log(state);
  };

  return (
    <div className="start-screen">
      <h1>Battaglia Navale</h1>
      <div>
        <button onClick={() => buttonSingle()}>Single Player</button>
        <button onClick={() => buttonMulti()}>Multi Player</button>
      </div>
    </div>
  );
}

export default StartPage;
