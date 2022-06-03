import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCsv6IUt0qitzBrhVYCcLAIpUkZpIh9S5k',
  authDomain: 'access-2022-5a7ae.firebaseapp.com',
  projectId: 'access-2022-5a7ae',
  storageBucket: 'access-2022-5a7ae.appspot.com',
  messagingSenderId: '27227907030',
  appId: '1:27227907030:web:1fc5e7f65546777c3bfa77',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
