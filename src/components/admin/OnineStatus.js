import React from 'react';

function OnineStatus(props) {
  const { onlineUsers } = props;
  return (
    <div className="flex justify-center">
      <div className="bg-access-green w-[105px] py-1 rounded-md text-white text-sm">
        {`Login : ${onlineUsers || ''} user`}
      </div>
    </div>
  );
}

export default OnineStatus;
