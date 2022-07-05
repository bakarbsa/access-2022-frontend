import QuestionTileState from '../../models/questionTileState';

function QuestionTile(props) {
  const { number, state } = props;

  let color = 'bg-[#F4F7FE]';

  if (state === QuestionTileState.Answered) {
    color = 'bg-[#84F3DA]';
  } else if (state === QuestionTileState.Selected) {
    color = 'bg-[#B5BDCA]';
  }

  return (
    <div className={`m-2 w-24 h-24 rounded-xl flex justify-center items-center  ${color}`}>
      <p className="text-xl">{number + 1}</p>
    </div>
  );
}

export default QuestionTile;
