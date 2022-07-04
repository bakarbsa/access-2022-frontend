import axios from 'axios';
import {
  onSnapshot, collection,
} from 'firebase/firestore';
import { useEffect } from 'react';
import API_URL from '../api';
import db from '../firebase-config';

const questionStreamInit = (setQuestions) => {
  useEffect(() => {
    onSnapshot(collection(db, 'questions'), (col) => {
      const tempQuestions = [];
      col.docs.forEach((data) => {
        tempQuestions.push(data.data());
      });
      setQuestions(tempQuestions);
    });
  });
};

const updateAnswer = async (token, answer, id) => {
  await axios.put(`${API_URL}/users/answer/${id}`, answer, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

export { questionStreamInit, updateAnswer };
