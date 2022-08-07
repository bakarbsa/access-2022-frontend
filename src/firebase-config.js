import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC2uPSkoJ1c7THe8nIuXtdbiLNd63oYKJU',
  authDomain: 'access-2022-4e343.firebaseapp.com',
  projectId: 'access-2022-4e343',
  storageBucket: 'access-2022-4e343.appspot.com',
  messagingSenderId: '723093986063',
  appId: '1:723093986063:web:0f646ce012cc7ea0347c7a',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
