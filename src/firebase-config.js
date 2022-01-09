import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBs8lRnKg3r90pb-pGbndKFSrT74F0S2QY',
  authDomain: 'projet-awi-4e549.firebaseapp.com',
  databaseURL:
    'https://projet-awi-4e549-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'projet-awi-4e549',
  storageBucket: 'projet-awi-4e549.appspot.com',
  messagingSenderId: '199233000129',
  appId: '1:199233000129:web:942a4a5488965b69b5fa40',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
