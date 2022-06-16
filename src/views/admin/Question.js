import React from 'react';
import useSideNav from '../../hooks/useSideNav';

function Question() {
  const { index } = useSideNav();
  return (
    <div className={index === 3 ? 'block' : 'hidden'}>Question</div>
  );
}

export default Question;
