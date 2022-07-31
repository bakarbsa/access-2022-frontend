import React from 'react';
import { RefreshIcon } from '@heroicons/react/outline';

function RefreshButton(props) {
  const { onClick } = props;
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="flex items-center gap-2 bg-access-green px-2 py-1 rounded-md"
      >
        <RefreshIcon className="w-4 text-access-white" />
        <p className="text-access-white text-sm">Refresh</p>
      </button>
    </div>
  );
}

export default RefreshButton;
