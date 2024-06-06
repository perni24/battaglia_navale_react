import "./endPage.css"

function endPage({state}){
    console.log(state)
    return(
        <>
        {state === 3 ? <p className="risultato">Vittoria 😎</p> : <p className="risultato">Sconfitta 😱</p>}
        <button onClick={() => window.location.reload()}>Rigioca</button>
        </>
    )
}

export default endPage