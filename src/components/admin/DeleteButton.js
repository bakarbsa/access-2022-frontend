import React from 'react';
import UserServices from '../../services/userServices';

function DeleteButton(props) {
  const { content, id } = props;
  const onClick = () => {
    UserServices.deleteUser(id);
  };
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

export default DeleteButton;
