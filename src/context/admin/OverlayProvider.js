import { createContext } from 'react';

const OverlayContext = createContext({
  editOverlay: false,
  deleteOverlay: false,
  addOverlay: false,
});

export default OverlayContext;
