import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import db from '../firebase-config';

const usersCollectionRef = collection(db, 'users');

class UserServices {
  constructor() {
    this.getUsers = () => {
      const [users, setUsers] = useState([]);

      useEffect(() => onSnapshot(usersCollectionRef, (snapshot) => {
        setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }), []);

      return users;
    };
  }
}

export default new UserServices();
