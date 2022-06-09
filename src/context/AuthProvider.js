import { createContext, useMemo, useState } from 'react';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});
  const authMemo = useMemo(() => ({ auth, setAuth }));
  return (
    <AuthContext.Provider value={authMemo}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
