import {
  onSnapshot, collection, doc, updateDoc,
} from 'firebase/firestore';
import { useEffect } from 'react';
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

const updateAnswer = async (answer, id) => {
  const docRef = doc(db, 'users', id.toString());
  console.log(id);
  updateDoc(docRef, {
    currentAnswer: answer,
  });
};

export { questionStreamInit, updateAnswer };
