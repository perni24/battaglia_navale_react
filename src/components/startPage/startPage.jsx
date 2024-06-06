import "./startPage.css";

function StartPage({ state, setState , modalita, setModalita}) {
  const buttonSingle = () => {
    setState((prevState) => prevState + 1);
    setModalita((prevState) => prevState + 1);
  };

  const buttonMulti = () => {
    setState((prevState) => prevState + 1);
    setModalita((prevState) => prevState + 2);
    console.log(state);
  };

  return (
    <div className="start-screen">
      <h1>Battaglia Navale</h1>
      <div className="">
        <button onClick={() => buttonSingle()} style={{ marginRight: "1vw" }} className="startButton">Single Player</button>
        <button onClick={() => buttonMulti()} className="startButton">Multi Player</button>
      </div>
    </div>
  );
}

export default StartPage;
