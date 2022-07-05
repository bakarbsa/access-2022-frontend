// import axios from 'axios';
import axios from 'axios';
import {
  collection, query, doc, setDoc, getDocs, onSnapshot,
} from 'firebase/firestore';
import { useEffect } from 'react';
import API_URL from '../api';
// import API_URL from '../api';
import db from '../firebase-config';

const getQuestion = async (setQuestions) => {
  const q = query(collection(db, 'questions'));
  const querySnapshot = await getDocs(q);
  const tempQuestions = [];
  querySnapshot.forEach((d) => {
    tempQuestions.push(d.data());
  });
  setQuestions(tempQuestions);
};

// const getAnswers = async (setAnswers, id) => {
//   const docRef = doc(db, 'users', id);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     setAnswers(docSnap.data().currentAnswer);
//     console.log(docSnap.data().currentAnswer);
//   } else {
//     // doc.data() will be undefined in this case
//     console.log('No such document!');
//   }
// };

const answersStream = (setAnswers, username) => {
  useEffect(() => {
    const unsubscribe = () => {
      const colRef = collection(db, 'users');
      const itemsQuery = query(colRef);
      return onSnapshot(itemsQuery, (querySnapshot) => {
        querySnapshot.docs.forEach((data) => {
          if (data.data().username === username) {
            setAnswers(data.data().currentAnswer);
            console.log('setfrom stream');
          }
        });
      }, (error) => console.log(error));
    };
    return unsubscribe;
  }, []);
};
const updateAnswers = async (setAnswers, answers, id) => {
  setAnswers(answers);
  console.log('setfrom updateanswers');
  const docRef = doc(db, 'users', id);
  const timeValidation = await axios.get(`${API_URL}/users/answer/validation`);
  if (!timeValidation.data.success) {
    console.log('Time is up');
    return;
  }
  setDoc(docRef, { currentAnswer: answers }, { merge: true });
};

export {
  getQuestion,
  updateAnswers,
  answersStream,
};
