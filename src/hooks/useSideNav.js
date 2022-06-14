import { useContext } from 'react';
import SideNavContext from '../context/admin/SideNavProvider';

const useSideNav = () => useContext(SideNavContext);

export default useSideNav;
