import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getDatabase, ref, onValue, update } from "firebase/database";

//-------------------------------------------------------------------------------------------------------------------------

// Effettua la richiesta dei dati al database e visualizzali nella console
const requestAllData = () => {
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

export const insertStanza = (stanza,player) => {
    
    const firebaseApp = initializeApp(firebaseConfig); // Inizializza l'app Firebase

    const databaseRef = getDatabase(firebaseApp); // Ottieni un riferimento al nodo del database in cui desideri salvare i dati

    // Aggiorna solo i dati specifici all'interno di 'stanze' nel database
    update(ref(databaseRef, "stanze/" + stanza), {
      player1: player,
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


  export const joinStanza = (stanza,player) => {
    
    const firebaseApp = initializeApp(firebaseConfig); // Inizializza l'app Firebase

    const databaseRef = getDatabase(firebaseApp); // Ottieni un riferimento al nodo del database in cui desideri salvare i dati

    // Aggiorna solo i dati specifici all'interno di 'stanze' nel database
    update(ref(databaseRef, "stanze/" + stanza), {
      player2: player,
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

  export const insertNavi = (stanza,arrNavi,posizione) => {
    
    const firebaseApp = initializeApp(firebaseConfig); // Inizializza l'app Firebase

    const databaseRef = getDatabase(firebaseApp); // Ottieni un riferimento al nodo del database in cui desideri salvare i dati

    // Aggiorna solo i dati specifici all'interno di 'stanze' nel database
    if(posizione === 1){
    update(ref(databaseRef, "stanze/" + stanza), {
      naviplayer1: arrNavi,
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
    }
    if(posizione === 2){
      update(ref(databaseRef, "stanze/" + stanza), {
        naviplayer2: arrNavi,
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
      }
  };