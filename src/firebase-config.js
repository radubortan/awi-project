import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC0SGF6HANvi_cf1GOKfHclnuuSd57kjEY',
  authDomain: 'temp-project-21d5e.firebaseapp.com',
  projectId: 'temp-project-21d5e',
  storageBucket: 'temp-project-21d5e.appspot.com',
  messagingSenderId: '205229253309',
  appId: '1:205229253309:web:4c640ae5ec6fc35e9f8dd4',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
