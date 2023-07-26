"use client"; 
import React, { useState } from 'react';
import NewGame from '../app/components/NewGame';
import AddTrade from '../app/components/AddTrade';

type PlayerNames = {
  player1: string;
  player2: string;
  player3: string;
  player4: string;
};

type Trade = {
  sentence: string;
  isStrikedThrough: boolean;
};

const Page = () => {
  const [playerNames, setPlayerNames] = useState<PlayerNames>({
    player1: '',
    player2: '',
    player3: '',
    player4: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [trades, setTrades] = useState<Trade[]>([]);

  const handlePlayerNamesUpdate = (names: PlayerNames) => {
    setPlayerNames(names);
    setFormSubmitted(true);
  };

  const handleAddTrade = (trade: string) => {
    setTrades((prevTrades) => [...prevTrades, { sentence: trade, isStrikedThrough: false }]);
  };

  const handleToggleTrade = (index: number) => {
    setTrades((prevTrades) =>
      prevTrades.map((trade, i) =>
        i === index ? { ...trade, isStrikedThrough: !trade.isStrikedThrough } : trade
      )
    );
  };
  

  const handleClearTrades = () => {
    setTrades([]); // Clear trades
  };

  const handleNewGame = () => {
    handleClearTrades(); // Call the handleClearTrades function when starting a new game
  };

  return (
    <>
      <div className="section section1">
        <NewGame onPlayerNamesUpdate={handlePlayerNamesUpdate} onNewGame={handleNewGame} />
        <div className="section-labels">Actions</div>
        <AddTrade playerNames={playerNames} onAddTrade={handleAddTrade} />
        <button
          className="button bg-black hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={handleClearTrades}
        >
          Clear Trades
        </button>
      </div>
      <div className="section section2">
        <div className="title page-title ">Catan Futures Market</div>
        <h2></h2>
        {formSubmitted && (
          <div className="text-2xl content-center py-4 px-2">
          Welcome  <a className="underline decoration-sky-500">{playerNames.player1},</a> <a className="underline decoration-sky-500">{playerNames.player2},</a> 
          <a className="underline decoration-sky-500">{playerNames.player3},</a> and <a className="underline decoration-sky-500">{playerNames.player4}</a>!<br />
          This tool helps you trade <a className="font-extrabold">future</a> resources with other players.<br /> Click Add A Trade to get started!
          <br /> Click on the trade to mark it as completed.
          </div>
        )}
      </div>
      <div className="section section3">
        <h1 className="section-labels">Trades</h1>
        {trades.length > 0 ? (
          <ul>
            {trades.map((trade, index) => (
              <li
                key={index}
                className={trade.isStrikedThrough ? 'strikethrough' : ''}
                onClick={() => handleToggleTrade(index)}
              >
                {trade.sentence}
              </li>
            ))}
          </ul>
        ) : (
          <p>No trades available</p>
        )}
      </div>
    </>
  );
};

export default Page;
