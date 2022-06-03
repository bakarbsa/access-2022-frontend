import React from 'react';
import userServices from '../../services/userServices';

function EditOverlay(props) {
  const { id, show } = props;
  console.log(id);
  const user = userServices.getUser(id);
  console.log(user);
  return (
    <div
      className={show ? 'h-full w-full fixed z-10 inset-0 flex justify-center items-center bg-black bg-opacity-30' : 'hidden'}
    >
      <div className="bg-white rounded-md p-5 flex flex-col z-50">
        <form action="submit" method="put">
          <table className="table-auto text-left">
            <tbody>
              <tr className="h-10">
                <th>{user.name}</th>
                <th>
                  <input
                    className="ml-2 pb-1 border-black focus:outline-none"
                    type="text"
                  />
                </th>
              </tr>
              <tr className="h-10">
                <th>University</th>
                <th>
                  <input
                    className="ml-2 pb-1 border-black focus:outline-none"
                    type="text"
                  />
                </th>
              </tr>
              <tr className="h-10">
                <th>Username</th>
                <th>
                  <input
                    className="ml-2 pb-1 border-black focus:outline-none"
                    type="text"
                  />
                </th>
              </tr>
              <tr className="h-10">
                <th>Password</th>
                <th>
                  <input
                    className="ml-2 pb-1 border-black focus:outline-none"
                    type="text"
                  />
                </th>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

export default EditOverlay;
