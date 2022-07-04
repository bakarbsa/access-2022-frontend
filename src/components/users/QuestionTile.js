import QuestionTileState from '../../models/questionTileState';

function QuestionTile(props) {
  const { number, state } = props;

  return (
    <div className={`m-2 w-24 h-24 rounded-xl flex justify-center items-center bg-[#F4F7FE] ${state === QuestionTileState.Answered ? 'bg-[#84F3DA]' : ''} ${state === QuestionTileState.Selected ? 'bg-[#B5BDCA]' : ''}`}>
      <p className="text-xl">{number + 1}</p>
    </div>
  );
}

export default QuestionTile;
