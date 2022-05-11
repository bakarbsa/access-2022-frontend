import React from 'react';
import userServices from './services/userServices';

function App() {
  const users = userServices.getUsers();
  return (
    <div>
      {users.length === 0
        ? (<h1>dafa</h1>)
        : (
          users.map((user) => (
            <div key={user.id}>{user.name}</div>
          ))
        )}
    </div>
  );
}

export default App;
