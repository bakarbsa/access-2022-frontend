import React, { useEffect, useState } from 'react';
import QuestionTile from './QuestionTile';
import QuestionTileState from '../../models/questionTileState';
import { answersStream, getQuestion, updateAnswers } from '../../services/questionServices';
import useAuth from '../../hooks/useAuth';
import UserServices from '../../services/userServices';

function OlimRoom() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questions, setQuestions] = useState({});
  const [answers, setAnswers] = useState([]);
  const { auth } = useAuth();
  const [userID, setUserID] = useState('');

  const getId = () => UserServices.getUserIDByUsername(setUserID, 'komeng', auth.accessToken);

  useEffect(() => {
    if (!userID) {
      getId();
    }
  }, [userID]);

  getQuestion(setQuestions);
  answersStream(setAnswers, 'komeng');

  const handleSubmit = (event) => {
    // eslint-disable-next-line no-alert
    alert('A name was submitted: ');
    event.preventDefault();
    console.log(answers);
  };

  const tileClickHandler = (number) => {
    setCurrentQuestion(number);
  };

  const answerClickHandler = (i) => {
    const tempAnswers = { ...answers };
    tempAnswers[currentQuestion] = i;
    updateAnswers(auth.accessToken, setAnswers, tempAnswers, userID);
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
  return (
    <div>
      <div className="flex h-screen w-screen pt-24">
        <div className="flex-auto p-12">
          <div className="flex flex-col justify-between h-full">
            <div className="flex-none">
              <h1 className="text-xl font-bold">Siapa Pintar</h1>
            </div>
            <div className="flex-1 grow p-12 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold">{`Pertanyaan ${currentQuestion}`}</p>
                </div>
              </div>
              <div className="py-12">
                {questions[currentQuestion - 1]?.question}
              </div>
              <form onSubmit={handleSubmit}>
                <p className="font-bold pb-2">Jawaban</p>
                <div className="flex flex-col">
                  {questions[currentQuestion - 1]?.answerList.map((answer, i) => (
                    <button type="button" onClick={() => { answerClickHandler(i + 1); }} className={`${answers[currentQuestion] === i + 1 ? 'bg-[#B5BDCA]' : 'bg-[#F4F7FE]'} flex justify-start p-4 mb-2 rounded-lg`}>{answer}</button>
                  ))}
                </div>
              </form>
              <div className="flex pt-12 justify-between">
                {currentQuestion === 1 ? <button type="button" className="bg-transparent" onClick={handlePrev} disabled><p className="hidden">Sebelumnya</p></button> : <button type="button" className="bg-[#68BC87] w-36 rounded-lg py-2" onClick={handlePrev}><p className="text-white">Sebelumnya</p></button>}
                {currentQuestion === questions.length ? <button type="button" className="w-36 rounded-lg py-2 bg-red-500" onClick={handleNext}><p className="text-white">Selesai</p></button> : <button className="bg-[#68BC87] w-36 rounded-lg py-2" type="button" onClick={handleNext}><p className="text-white">Selanjutnya</p></button>}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-none w-[32rem] overflow-scroll">
          <div className="flex flex-wrap">
            {[...Array(questions.length)]
              .map((x, i) => <button type="button" onClick={() => tileClickHandler(i + 1)}><QuestionTile number={i} state={currentQuestion === i + 1 ? QuestionTileState.Selected : QuestionTileState.Nothing} /></button>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OlimRoom;
