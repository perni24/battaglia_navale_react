import './startPage.css';

function StartPage({state,setState}) {
    const buttonStart = () => {
        setState(prevState => prevState + 1);
        console.log(state)
      };
    return (
        <div className="startContainer">
            <img className='imgNave' src="/nave.png" />
            <h1>Navy Battle</h1>
            <button className="startButton" id="startButton" onClick={buttonStart}>Start</button>
        </div>
    );
}

export default StartPage;
