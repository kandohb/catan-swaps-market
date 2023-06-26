import React, { useState } from 'react';
import Modal from './Modal';

type AddTradeProps = {
  playerNames: PlayerNames;
  onAddTrade: (trade: string) => void;
};

type PlayerNames = {
  player1: string;
  player2: string;
  player3: string;
  player4: string;
};

const AddTrade: React.FC<AddTradeProps> = ({ playerNames, onAddTrade }) => {
  const [showModal, setShowModal] = useState(false);
  const [offerPlayer, setOfferPlayer] = useState<keyof PlayerNames>('' as keyof PlayerNames);
  const [receivePlayer, setReceivePlayer] = useState<keyof PlayerNames>('' as keyof PlayerNames);
  
  const [resource, setResource] = useState('');

  const handleAddTradeClick = () => {
    setShowModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tradeSentence = `${playerNames[offerPlayer]} sells ${playerNames[receivePlayer]} a future ${resource}`;
    onAddTrade(tradeSentence);
    setShowModal(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        className="button bg-black hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        onClick={handleAddTradeClick}
      >
        Add Trade
      </button>
      {showModal && (
        <Modal isVisible={showModal} onClose={handleModalClose}>
          <form onSubmit={handleFormSubmit}>
            <h2 className="font-bold text-2xl">Add a Trade</h2>
            <select value={offerPlayer} onChange={(e) => setOfferPlayer(e.target.value as keyof PlayerNames)}>
              <option value="">Select Player Offering</option>
              {Object.keys(playerNames).map((key) => (
                <option key={key} value={key as keyof PlayerNames}>{playerNames[key as keyof PlayerNames]}</option>
              ))}
            </select>
            <select value={receivePlayer} onChange={(e) => setReceivePlayer(e.target.value as keyof PlayerNames)}>
              <option value="">Select Player Receiving</option>
              {Object.keys(playerNames).map((key) => (
                <option key={key} value={key as keyof PlayerNames}>{playerNames[key as keyof PlayerNames]}</option>
              ))}
            </select>
            <select className="pr-5"value={resource} onChange={(e) => setResource(e.target.value)}>
              <option value="">Select Resource</option>
              <option value="brick">Brick</option>
              <option value="ore">Ore</option>
              <option value="wheat">Wheat</option>
              <option value="sheep">Sheep</option>
              <option value="wood">Wood</option>
            </select>
            <button type="submit"
            className="button align-middle bg-black hover:bg-red-400 text-white font-bold py-2 px-10 pl-5 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >Submit</button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddTrade;
