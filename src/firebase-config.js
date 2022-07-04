import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBEr4kAKWUzsQFqmnP6bjar2CCbOEh07ZI',
  authDomain: 'access-2022-test1.firebaseapp.com',
  projectId: 'access-2022-test1',
  storageBucket: 'access-2022-test1.appspot.com',
  messagingSenderId: '846258885328',
  appId: '1:846258885328:web:b8784a5fb62833955644d5',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
