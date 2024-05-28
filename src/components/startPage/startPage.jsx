import './startPage.css';

function StartPage({state,setState}) {
    const buttonStart = () => {
        setState(prevState => prevState + 1);
        console.log(state)
      };
    return (
        <div class="start-screen">
        <h1>Battaglia Navale</h1>
        <button onClick={()=>buttonStart()}>Inizia il gioco</button>
        </div>
    );
}

export default StartPage;
