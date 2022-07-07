import QuestionTileState from '../../models/questionTileState';

function QuestionTile(props) {
  const { number, state } = props;

  let color = 'bg-gray-200';

  if (state === QuestionTileState.Answered) {
    color = 'bg-access-primary';
  } else if (state === QuestionTileState.Selected) {
    color = 'bg-blue-500';
  }

  return (
    <div className={`w-20 h-20 rounded-xl flex justify-center items-center  ${color}`}>
      <p className="text-xl">{number + 1}</p>
    </div>
  );
}

export default QuestionTile;
