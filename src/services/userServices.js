import axios from 'axios';
import {
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import db from '../firebase-config';
import API_URL from '../api';

const usersCollectionRef = collection(db, 'users');

class UserServices {
  constructor() {
    // GET ALL USER (REALTIME)
    this.getUsers = () => {
      const [users, setUsers] = useState([]);
      const userRoleQuery = query(usersCollectionRef, where('role', '==', 'user'));

      useEffect(() => onSnapshot(userRoleQuery, (snapshot) => {
        setUsers(snapshot.docs.map((user) => ({ ...user.data(), id: user.id })));
      }), []);

      return users;
    };
    // GET ONE USER
    this.getUser = async (id) => {
      const user = await axios.get(`${API_URL}/admins/users/${id}`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.VXlTc0Q1Wlh4djRyZkRsSHN6YjY.4QJhqs6uztj1U7ZZ0JMjI_ujGrpFjoIsohYAGeOaoPY',
        },
      })
        .then(() => console.log('Fetch successfully'))
        .catch((err) => console.log(err));

      return user;
    };
    // DELETE USER
    this.deleteUser = async (id) => {
      await axios.delete(`${API_URL}/admins/users/${id}`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.VXlTc0Q1Wlh4djRyZkRsSHN6YjY.4QJhqs6uztj1U7ZZ0JMjI_ujGrpFjoIsohYAGeOaoPY',
        },
      })
        .then(() => console.log('Deleted successfully'))
        .catch((err) => console.log(err));
    };
  }
}

export default new UserServices();
