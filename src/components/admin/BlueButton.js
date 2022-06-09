import React from 'react';

function BlueButton(props) {
  const { content, onClick } = props;
  return (
    <button
      type="submit"
      onClick={onClick}
      className="bg-access-blue-100 text-access-white text-sm font-normal rounded-md w-fit px-2 py-1"
    >
      {content}
    </button>
  );
}

export default BlueButton;
