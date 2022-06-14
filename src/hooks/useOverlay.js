import { useContext } from 'react';
import OverlayContext from '../context/admin/OverlayProvider';

const useOverlay = () => useContext(OverlayContext);

export default useOverlay;
