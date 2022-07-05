// import axios from 'axios';
import axios from 'axios';
import {
  onSnapshot, collection, query, doc, setDoc,
} from 'firebase/firestore';
import { useEffect } from 'react';
import API_URL from '../api';
// import API_URL from '../api';
import db from '../firebase-config';

const getQuestion = (setQuestions) => {
  useEffect(() => {
    const unsubscribe = () => {
      const colRef = collection(db, 'questions');
      const itemsQuery = query(colRef);
      return onSnapshot(itemsQuery, (querySnapshot) => {
        const tempQuestions = [];
        querySnapshot.docs.forEach((data) => {
          tempQuestions.push(data.data());
        });
        setQuestions(tempQuestions);
      }, (error) => console.log(error));
    };
    console.log('testst');
    return unsubscribe;
  }, []);
};

const answersStream = (setAnswers, username) => {
  useEffect(() => {
    const unsubscribe = () => {
      const colRef = collection(db, 'users');
      const itemsQuery = query(colRef);
      return onSnapshot(itemsQuery, (querySnapshot) => {
        querySnapshot.docs.forEach((data) => {
          if (data.data().username === username) {
            setAnswers(data.data().currentAnswer);
          }
        });
      }, (error) => console.log(error));
    };
    console.log('teststanwers');
    return unsubscribe;
  }, []);
};

const updateAnswers = async (setAnswers, answers, id) => {
  const docRef = doc(db, 'users', id);
  const timeValidation = await axios.get(`${API_URL}/users/answer/validation`);
  if (!timeValidation.data.success) {
    console.log('Time is up');
    return;
  }
  setDoc(docRef, { currentAnswer: answers }, { merge: true });
  setAnswers(answers);
};

// const updateAnswer = async (token, answer, id) => {
//   await axios.put(`${API_URL}/users/answer/${id}`, answer, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((res) => console.log(res.data))
//     .catch((err) => console.log(err));
// };

export { getQuestion, answersStream, updateAnswers };
