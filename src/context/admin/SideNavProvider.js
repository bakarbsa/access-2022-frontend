import { createContext, useMemo, useState } from 'react';

const SideNavContext = createContext({});

export function SideNavProvider({ children }) {
  const [index, setIndex] = useState(0);
  const indexMemo = useMemo(() => ({ index, setIndex }));
  return (
    <SideNavContext.Provider value={indexMemo}>
      {children}
    </SideNavContext.Provider>
  );
}

export default SideNavContext;
