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

const answersStream = (setAnswers, username) => {
  useEffect(() => {
    const colRef = collection(db, 'users');
    const itemsQuery = query(colRef);
    onSnapshot(itemsQuery, (querySnapshot) => {
      querySnapshot.docs.forEach((data) => {
        console.log('matching username');
        if (data.data().username === username) {
          setAnswers(data.data().currentAnswer);
          console.log('set answers  from stream');
          console.log(data.data().currentAnswer);
        }
      });
    });
  }, []);
};
const updateAnswers = async (answers, id, setError) => {
  const docRef = doc(db, 'users', id);
  const timeValidation = await axios.get(`${API_URL}/users/answer/validation/${id}`);
  if (!timeValidation.data.success) {
    console.log(timeValidation.data.message);
    setError(timeValidation.data.message);
    return;
  }
  setDoc(docRef, { currentAnswer: answers }, { merge: true });
};

const deleteAnswer = async (setAnswers, answers, questionId, id) => {
  setAnswers(answers);
  const docRef = doc(db, 'users', id);
  const timeValidation = await axios.get(`${API_URL}/users/answer/validation/${id}`);
  if (!timeValidation.data.success) {
    console.log('Time is up');
    return;
  }
  const updatedMap = {};
  updatedMap[`currentAnswer.${questionId}`] = deleteField();
  updateDoc(docRef, updatedMap);
};

export {
  getQuestion,
  updateAnswers,
  answersStream,
  deleteAnswer,
};
