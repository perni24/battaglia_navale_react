import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getDatabase, ref, onValue, update } from "firebase/database";

//-------------------------------------------------------------------------------------------------------------------------

// Effettua la richiesta dei dati al database e visualizzali nella console
export const requestAllData = () => {
    return new Promise((resolve, reject) => {
      // Inizializza l'app Firebase
      const firebaseApp = initializeApp(firebaseConfig);
  
      // Ottieni un riferimento al nodo nel database da cui desideri recuperare i dati
      const databaseRef = ref(getDatabase(firebaseApp));
  
      // Ascolta gli eventi "value" sul nodo del database e recupera i dati
      onValue(databaseRef, (snapshot) => {
        const data = snapshot.val();
        resolve(data); // Risolve la Promise con i dati recuperati
      }, (error) => {
        reject(error); // Rigetta la Promise in caso di errore
      });
    });
  };
  
//-------------------------------------------------------------------------------------------------------------------------

export async function fetchData() {
    try {
      const data = await requestAllData();
      return { success: true, data };
    } catch (error) {
      console.error('Errore durante il recupero dei dati:', error);
      return { success: false, error };
    }
  }
  

//-------------------------------------------------------------------------------------------------------------------------

export const handleGenerateRoomClick = () => {
    
    const firebaseApp = initializeApp(firebaseConfig); // Inizializza l'app Firebase

    const databaseRef = getDatabase(firebaseApp); // Ottieni un riferimento al nodo del database in cui desideri salvare i dati

    // Aggiorna solo i dati specifici all'interno di 'stanze' nel database
    update(ref(databaseRef, "stanze/" + id), {
      player1: "",
      player2: "",
      arr1: [1, 2],
      arr2: [3, 4],
    })
      .then(() => {
        console.log("Dati della stanza aggiornati con successo nel database.");
      })
      .catch((error) => {
        console.error(
          "Errore durante l'aggiornamento dei dati della stanza nel database:",
          error
        );
      });
      
  };