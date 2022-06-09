import React from 'react';

function Button(props) {
  const { content, onClick } = props;
  return (
    <button
      type="submit"
      onClick={onClick}
      className="bg-access-dark text-access-white font-semibold rounded-md w-36 px-4 py-2"
    >
      {content}
    </button>
  );
}

export default Button;
