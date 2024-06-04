import { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebaseConfig';
import { getDatabase, ref, onValue } from "firebase/database";

function homeMultiPlayer() {

    var roomData = {id: 1}

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
        });
    };

    const handleGenerateRoomClick = () => {
        const firebaseApp = initializeApp(firebaseConfig); // Inizializza l'app Firebase

        const databaseRef = ref(getDatabase(firebaseApp)); // Ottieni un riferimento al nodo del database in cui desideri salvare i dati

        // Salva i dati della stanza nel database
        set(databaseRef, roomData)
            .then(() => {
                console.log("Dati della stanza salvati con successo nel database.");
            })
            .catch((error) => {
                console.error("Errore durante il salvataggio dei dati della stanza nel database:", error);
            });
    };
   /* // Chiamare la funzione per richiedere i dati quando il componente viene montato
    useEffect(() => {
        requestAllData();
    }, []);*/

    return (
        <>
            <button onClick={requestAllData}>genera stanza</button>
            <button>unisciti</button>
        </>
    );
}

export default homeMultiPlayer;
