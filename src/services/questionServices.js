/* eslint-disable no-unused-vars */
import axios from 'axios';
import {
  collection, query, doc, setDoc, getDoc, onSnapshot, updateDoc, deleteField, arrayRemove,
} from 'firebase/firestore';
import { useEffect } from 'react';
import API_URL from '../api';
import db from '../firebase-config';

const getQuestion = async (setQuestions, setQuestionsOrder, id) => {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);
  const sortedQuestions = [];
  if (docSnap.exists()) {
    setQuestionsOrder(docSnap.data().questionsId);
    docSnap.data().questionsId.forEach(async (idQ) => {
      const qRef = doc(db, 'questions', idQ);
      const qSnap = await getDoc(qRef);
      sortedQuestions.push(qSnap.data());
    });
    setQuestions(sortedQuestions);
  } else {
    console.log('No such document!');
  }
};

const getAnswers = async (setAnswers, id, loadingAnswers, setLoadingAnswers) => {
  setLoadingAnswers(true);
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await setAnswers(docSnap.data().currentAnswer);
  } else {
    console.log('No such document!');
  }
  setLoadingAnswers(false);
};

// const answersStream = (setAnswers, username) => {
//   useEffect(() => {
//     const colRef = collection(db, 'users');
//     const itemsQuery = query(colRef);
//     onSnapshot(itemsQuery, (querySnapshot) => {
//       querySnapshot.docs.forEach((data) => {
//         if (data.data().username === username) {
//           setAnswers(data.data().currentAnswer);
//           const source = data.metadata.hasPendingWrites ? 'Local' : 'Server';
//           console.log(source, ' data: ', data.data());
//         }
//       });
//     }, { includeMetadataChanges: true });
//   }, []);
// };
const updateAnswers = async (answers, id, setError, setUpdateAnswerBuffer, updateAnswerBuffer) => {
  setUpdateAnswerBuffer(updateAnswerBuffer + 1);
  const docRef = doc(db, 'users', id);
  try {
    await axios.get(`${API_URL}/users/answer/validation/${id}`).then(async (timeValidation) => {
      if (!timeValidation.data.success) {
        console.log(timeValidation.data.message);
        setError(timeValidation.data.message);
        return;
      }
      await setDoc(docRef, { currentAnswer: answers }, { merge: true }).then((msg) => {
        if (updateAnswerBuffer !== 0) setUpdateAnswerBuffer(updateAnswerBuffer - 1);
        console.log('answers updated');
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteAnswer = async (setAnswers, answers, questionId, id, updateAnswerBuffer, setUpdateAnswerBuffer) => {
  setAnswers(answers);
  setUpdateAnswerBuffer(updateAnswerBuffer + 1);
  const docRef = doc(db, 'users', id);
  try {
    await axios.get(`${API_URL}/users/answer/validation/${id}`).then(async (timeValidation) => {
      if (!timeValidation.data.success) {
        console.log(timeValidation.data.message);
        return;
      }
      const updatedMap = {};
      updatedMap[`currentAnswer.${questionId}`] = deleteField();
      await updateDoc(docRef, updatedMap);
      if (updateAnswerBuffer !== 0) setUpdateAnswerBuffer(updateAnswerBuffer - 1);
    });
  } catch (err) {
    console.log(err);
  }
};

export {
  getQuestion,
  updateAnswers,
  getAnswers,
  deleteAnswer,
};
