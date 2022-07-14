import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'YOUR CRED',
  authDomain: 'YOUR CRED',
  projectId: 'YOUR CRED',
  storageBucket: 'YOUR CRED',
  messagingSenderId: 'YOUR CRED',
  appId: 'YOUR CRED',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
