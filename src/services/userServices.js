import axios from 'axios';
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import db from '../firebase-config';
import API_URL from '../api';

const usersCollectionRef = collection(db, 'users');

class UserServices {
  constructor() {
    // GET ALL USER (REALTIME)
    this.getUsers = (sort = false) => {
      const [users, setUsers] = useState([]);
      let userRoleQuery;
      if (sort) {
        userRoleQuery = query(usersCollectionRef, where('role', '==', 'user'), orderBy('score', 'desc'));
      } else {
        userRoleQuery = query(usersCollectionRef, where('role', '==', 'user'));
      }

      useEffect(() => onSnapshot(userRoleQuery, (snapshot) => {
        setUsers(snapshot.docs.map((user) => ({ ...user.data(), id: user.id })));
      }), []);

      return users;
    };
    // GET USER ID BY USERNAME
    this.getUserIDByUsername = async (username) => {
      const q = query(usersCollectionRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);
      console.log('asdas');
      return querySnapshot.docs[0].id;
    };
    // GET ONE USER
    this.getUser = async (id, token) => {
      const user = await axios.get(`${API_URL}/admins/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => console.log('Fetch successfully'))
        .catch((err) => console.log(err));

      return user;
    };
    // DELETE USER
    this.deleteUser = async (id, token) => {
      await axios.delete(`${API_URL}/admins/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => console.log('Deleted successfully'))
        .catch((err) => console.log(err));
    };
    // UPDATE USER
    this.updateUser = async (id, token, data) => {
      await axios.put(`${API_URL}/admins/users/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => console.log('Edit successful'))
        .catch((err) => console.log(err));
    };
    // ADD USER
    this.addUser = async (token, data) => {
      await axios.post(`${API_URL}/admins/users`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => console.log('Add successful'))
        .catch((err) => console.log(err));
    };
  }
}

export default new UserServices();
