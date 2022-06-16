import axios from 'axios';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import db from '../firebase-config';
import API_URL from '../api';

const startDocRef = doc(db, 'olim', 'zG9bpK5Nbq83Ly1veuFE');

class OlimServices {
  constructor() {
    // GET START STATE
    this.getStartState = () => {
      const [start, setStart] = useState();
      useEffect(() => onSnapshot(startDocRef, (snapshot) => {
        setStart(snapshot.data().isStart);
      }), []);
      return start;
    };
    // UPDATE START STATE
    this.updateStartState = async (token) => {
      await axios.put(`${API_URL}/admins/olim`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => console.log('Update isStart successful'))
        .catch((err) => console.log(err));
    };
  }
}

export default new OlimServices();
