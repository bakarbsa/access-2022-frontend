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
    // GET TIME
    this.getTime = async (role, setState) => {
      await axios.get(`${API_URL}/${role}s/olim/time`)
        .then((res) => {
          if (!res.data) {
            console.log('data tidak ditemukan');
          }
          setState(res.data.data);
        })
        .catch((err) => console.log(err));
    };
    // UPDATE START STATE
    this.updateStartState = async () => {
      await axios.put(`${API_URL}/admins/olim`, {})
        .then(() => console.log('Update isStart successful'))
        .catch((err) => console.log(err));
    };
    this.updateTime = async (startTime, endTime) => {
      await axios.put(`${API_URL}/admins/olim/time`, { startTime, endTime })
        .then(() => console.log('Update startTime successful'))
        .catch((err) => console.log(err));
    };
  }
}

export default new OlimServices();
