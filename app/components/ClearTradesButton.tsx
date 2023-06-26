import React from 'react';

type ClearTradesButtonProps = {
  onClearTrades: () => void;
};

const ClearTradesButton: React.FC<ClearTradesButtonProps> = ({ onClearTrades }) => {
  return (
    <button
      className="button bg-black hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      onClick={onClearTrades}
    >
      Clear Trades
    </button>
  );
};

export default ClearTradesButton;
