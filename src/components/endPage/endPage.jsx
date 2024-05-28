function endPage({state}){
    console.log(state)
    return(
        <>
        {state === 3 ? <p>Vittoria</p> : <p>Sconfitta</p>}
        </>
    )
}

export default endPage