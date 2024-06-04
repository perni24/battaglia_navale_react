import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebaseConfig';
import { getDatabase, ref, onValue, update} from "firebase/database";

function homeMultiPlayer() {
    const [namePlayer, setNamePlayer] = useState("");
    const [getDati, setGetDati] = useState(null);
    var id = 10

    // Effettua la richiesta dei dati al database e visualizzali nella console
    const requestAllData = () => {
        // Inizializza l'app Firebase
        const firebaseApp = initializeApp(firebaseConfig);

        // Ottieni un riferimento al nodo nel database da cui desideri recuperare i dati
        const databaseRef = ref(getDatabase(firebaseApp));

        // Ascolta gli eventi "value" sul nodo del database e recupera i dati
        onValue(databaseRef, (snapshot) => {
            const data = snapshot.val();
            console.log("Tutti i dati dal database:", data);
            setGetDati(data)
        });
    };

    // // Chiamare la funzione per richiedere i dati quando il componente viene montato
    // useEffect(() => {
    //     requestAllData();
    // }, []);

    const handleGenerateRoomClick = () => {
        requestAllData();
        console.log(getDati)

        const firebaseApp = initializeApp(firebaseConfig); // Inizializza l'app Firebase
    
        const databaseRef = getDatabase(firebaseApp); // Ottieni un riferimento al nodo del database in cui desideri salvare i dati

        // Aggiorna solo i dati specifici all'interno di 'stanze' nel database
        update(ref(databaseRef, 'stanze/'+id), {
            player1: "", player2: "" , arr1:[1,2], arr2:[3,4]
        })
        .then(() => {
            console.log("Dati della stanza aggiornati con successo nel database.");
        })
        .catch((error) => {
            console.error("Errore durante l'aggiornamento dei dati della stanza nel database:", error);
        });
    };
    

    const trovaId = () =>{

    }

    return (
        <>
            <input type="text" />
            <button onClick={handleGenerateRoomClick}>genera stanza</button>
            <button>unisciti</button>
        </>
    );
}

export default homeMultiPlayer;
