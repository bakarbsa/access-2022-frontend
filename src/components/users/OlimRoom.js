/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import QuestionTile from './QuestionTile';
import QuestionTileState from '../../models/questionTileState';
import {
  updateAnswers, answersStream, getQuestion, deleteAnswer,
} from '../../services/questionServices';
import UserServices from '../../services/userServices';
import Time from './Time';
import Loading from '../Loading';

function OlimRoom() {
  const [questionsOrder, setQuestionsOrder] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [userID, setUserID] = useState('');

  const userName = localStorage.getItem('user');

  const getId = () => UserServices.getUserIDByUsername(setUserID, userName);

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  useEffect(() => {
    if (!userID) {
      getId();
    }
    getQuestion(setQuestions, setQuestionsOrder, userID);
  }, [userID]);

  answersStream(setAnswers, userName);

  const handleSubmit = (event) => {
    // eslint-disable-next-line no-alert
    alert('A name was submitted: ');
    event.preventDefault();
  };

  const handleDone = () => {
    UserServices.finishOlim(userID);
    window.location.reload();
  };

  const tileClickHandler = (number) => {
    console.log('tile');
    setCurrentQuestion(number + 1);
    console.log(answers);
    console.log(questionsOrder[number]);
    console.log(answers[questionsOrder[number]]);
  };

  const answerClickHandler = (i) => {
    const tempAnswers = { ...answers };
    tempAnswers[questionsOrder[currentQuestion - 1]] = i;
    updateAnswers(setAnswers, tempAnswers, userID);
  };

  const handlePrev = () => {
    console.log('prev');
    if (currentQuestion === 1) {
      setCurrentQuestion(1);
    } else {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    console.log('next');
    if (currentQuestion === questions.length) {
      setCurrentQuestion(questions.length);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const clearChoice = () => {
    const tempAnswers = { ...answers };
    delete tempAnswers[questionsOrder[currentQuestion - 1]];
    deleteAnswer(setAnswers, tempAnswers, questionsOrder[currentQuestion - 1], userID);
  };

  const indexToAlfa = (index) => {
    if (index === 0) return 'A. ';
    if (index === 1) return 'B. ';
    if (index === 2) return 'C. ';
    if (index === 3) return 'D. ';
    if (index === 4) return 'E. ';
    return '';
  };

  return (
    questions.length <= 0 || answers.length <= 0
      ? <Loading />
      : (
        <div className="pt-28 px-12 mb-16 flex flex-row gap-20 overflow-hidden">
          <div className="flex flex-col justify-between w-full">
            <div className="flex justify-between items-center">
              <div className="pb-2">
                <p className="font-bold">{`Pertanyaan ${currentQuestion}`}</p>
              </div>
            </div>
            <div className="pb-5">
              {questions[currentQuestion - 1]?.question}
            </div>
            <form onSubmit={handleSubmit}>
              <p className="font-bold pb-2">Jawaban</p>
              <div className="flex flex-col">
                {questions[currentQuestion - 1]?.answerList.map((answer, i) => (
                  <button key={answer} type="button" onClick={() => { answerClickHandler(i + 1); }} className={`${answers[questionsOrder[currentQuestion - 1]] === i + 1 ? 'bg-access-primary' : 'bg-[#F4F7FE] hover:bg-gray-300'} flex justify-start p-4 mb-2 rounded-lg`}>{`${indexToAlfa(i)} ${answer}`}</button>
                ))}
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={clearChoice} className="text-red-400 pt-2">Hapus Pilihan</button>
              </div>
            </form>
            <div className="flex justify-between">
              {currentQuestion === 1 ? <button type="button" className="bg-transparent" onClick={handlePrev} disabled><p className="hidden">Sebelumnya</p></button> : <button type="button" className="bg-[#68BC87] w-36 rounded-lg py-2" onClick={handlePrev}><p className="text-white">Sebelumnya</p></button>}
              {currentQuestion === questions.length ? <button type="button" className="w-36 rounded-lg py-2 bg-red-500" onClick={handleDone}><p className="text-white">Selesai</p></button> : <button className="bg-[#68BC87] w-36 rounded-lg py-2" type="button" onClick={handleNext}><p className="text-white">Selanjutnya</p></button>}
            </div>
          </div>
          <div className="flex-none">
            <Time />
            <div className="h-[30rem] grid grid-cols-4 gap-2 overflow-y-scroll">
              {questions
                .map((question, i) => (<button type="button" onClick={() => tileClickHandler(i)}><QuestionTile number={i} state={currentQuestion === i + 1 ? QuestionTileState.Selected : (answers[questionsOrder[i]] !== undefined) ? QuestionTileState.Answered : QuestionTileState.Nothing} /></button>))}
            </div>
          </div>
        </div>
      )
  );
}

export default OlimRoom;
