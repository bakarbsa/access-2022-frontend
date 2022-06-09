import React from 'react';

function RedButton(props) {
  const { content, onClick } = props;
  return (
    <button
      type="submit"
      onClick={onClick}
      className="bg-red-500 text-access-white text-sm font-normal rounded-md w-fit px-2 py-1"
    >
      {content}
    </button>
  );
}

export default RedButton;
