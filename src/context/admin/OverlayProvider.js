import { createContext, useMemo, useState } from 'react';

const OverlayContext = createContext({});

export function OverlayProvider({ children }) {
  const [overlay, setOverlay] = useState('false');
  const overlayMemo = useMemo(() => ({ overlay, setOverlay }));
  return (
    <OverlayContext.Provider value={overlayMemo}>
      {children}
    </OverlayContext.Provider>
  );
}

export default OverlayContext;
