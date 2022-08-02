/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import QuestionTile from './QuestionTile';
import QuestionTileState from '../../models/questionTileState';
import {
  updateAnswers, getQuestion, deleteAnswer, getAnswers,
} from '../../services/questionServices';
import UserServices from '../../services/userServices';
import Time from './Time';
import Loading from '../Loading';

function OlimRoom() {
  const [questionsOrder, setQuestionsOrder] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isBurstClick, setBurstClick] = useState(false);
  const [userID, setUserID] = useState('');
  const [errorUpdate, setErrorUpdate] = useState(null);
  const [updateAnswerBuffer, setUpdateAnswerBuffer] = useState(0);
  const [loadingAnswers, setLoadingAnswers] = useState(false);

  const userName = localStorage.getItem('user');
  const circleCommonClasses = 'h-2.5 w-2.5 bg-current rounded-full';

  const getId = () => UserServices.getUserIDByUsername(setUserID, userName);

  useEffect(() => {
    console.log(updateAnswerBuffer);
  }, [updateAnswerBuffer]);

  useEffect(() => {
    if (!userID) {
      getId();
    }
    if (userID) {
      getQuestion(setQuestions, setQuestionsOrder, userID);
      getAnswers(setAnswers, userID, loadingAnswers, setLoadingAnswers);
    }
  }, [userID]);

  const handleSubmit = (event) => {
    // eslint-disable-next-line no-alert
    alert('A name was submitted: ');
    event.preventDefault();
  };

  const handleDone = () => {
    UserServices.finishOlim(userID);
    window.location.reload();
  };

  const answerClickHandler = (i) => {
    const tempAnswers = { ...answers };
    tempAnswers[questionsOrder[currentQuestion - 1]] = i;
    setAnswers(tempAnswers);
    updateAnswers(tempAnswers, userID, setErrorUpdate, setUpdateAnswerBuffer, updateAnswerBuffer);
  };

  const tileClickHandler = (number) => {
    if (updateAnswerBuffer === 0) {
      getAnswers(setAnswers, userID, loadingAnswers, setLoadingAnswers);
    }
    setCurrentQuestion(number + 1);
  };

  const handlePrev = () => {
    if (updateAnswerBuffer === 0) {
      getAnswers(setAnswers, userID, loadingAnswers, setLoadingAnswers);
    }
    if (currentQuestion === 1) {
      setCurrentQuestion(1);
    } else {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (updateAnswerBuffer === 0) {
      getAnswers(setAnswers, userID, loadingAnswers, setLoadingAnswers);
    }
    if (currentQuestion === questions.length) {
      setCurrentQuestion(questions.length);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const clearChoice = () => {
    const tempAnswers = { ...answers };
    delete tempAnswers[questionsOrder[currentQuestion - 1]];
    deleteAnswer(setAnswers, tempAnswers, questionsOrder[currentQuestion - 1], userID, updateAnswerBuffer, setUpdateAnswerBuffer);
  };

  const indexToAlfa = (index) => {
    if (index === 0) return 'A. ';
    if (index === 1) return 'B. ';
    if (index === 2) return 'C. ';
    if (index === 3) return 'D. ';
    if (index === 4) return 'E. ';
    return '';
  };

  const renderAnswers = () => {
    if (loadingAnswers) {
      return (
        <div className="flex">
          <div className={`${circleCommonClasses} mr-1 animate-bounce`} />
          <div
            className={`${circleCommonClasses} mr-1 animate-bounce200`}
          />
          <div className={`${circleCommonClasses} animate-bounce400`} />
        </div>
      );
    }
    return (
      <div>
        <p className="font-bold pb-2">Jawaban</p>
        <div className="flex flex-col">
          {questions[currentQuestion - 1]?.answerList.map((answer, i) => (
            <button key={answer} type="button" onClick={() => { answerClickHandler(i + 1); }} className={`${answers[questionsOrder[currentQuestion - 1]] === i + 1 ? 'bg-access-primary' : 'bg-[#F4F7FE] hover:bg-gray-300'} flex justify-start p-4 mb-2 rounded-lg`}>{`${indexToAlfa(i)} ${answer}`}</button>
          ))}
        </div>
        <div className="flex justify-end">
          <button type="button" onClick={clearChoice} className="text-red-400 pt-2">Hapus Pilihan</button>
        </div>
      </div>
    );
  };

  return (
    questions.length <= 0
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
              {renderAnswers()}
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
                // eslint-disable-next-line react/no-array-index-key
                .map((question, i) => (<button key={i} type="button" onClick={() => tileClickHandler(i)}><QuestionTile number={i} state={currentQuestion === i + 1 ? QuestionTileState.Selected : (answers[questionsOrder[i]] !== undefined) ? QuestionTileState.Answered : QuestionTileState.Nothing} /></button>))}
            </div>
          </div>
          <div className="relative z-10">
            <div className={errorUpdate ? 'h-full w-full fixed z-10 inset-0 flex justify-center items-center bg-black bg-opacity-30' : 'hidden'}>
              <div className="bg-white rounded-md p-5 flex flex-col z-50">
                {errorUpdate || ''}
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    className="bg-red-500 text-access-white text-sm font-normal rounded-md w-fit px-2 py-1"
                    onClick={() => window.location.reload()}
                  >
                    Kembali
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  );
}

export default OlimRoom;
