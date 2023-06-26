import React, { useState } from 'react';
import Modal from './Modal';

type NewGameProps = {
  onPlayerNamesUpdate: (names: PlayerNames) => void;
  onNewGame: () => void; // Add the onNewGame prop
};

type PlayerNames = {
  player1: string;
  player2: string;
  player3: string;
  player4: string;
};

type ResourceCounts = {
  brick: number;
  ore: number;
  wheat: number;
  sheep: number;
  wood: number;
};

type ResourceTileCounts = {
  [resource in keyof ResourceCounts]: string[];
};

const NewGame: React.FC<NewGameProps> = ({ onPlayerNamesUpdate, onNewGame }) => {
  const [showModal, setShowModal] = useState(false);
  const [playerNames, setPlayerNames] = useState<PlayerNames>({
    player1: '',
    player2: '',
    player3: '',
    player4: '',
  });
  const resourceCounts: ResourceCounts = {
    brick: 3,
    ore: 3,
    wheat: 5,
    sheep: 4,
    wood: 3,
  };
  const [resourceTileCounts, setResourceTileCounts] = useState<ResourceTileCounts>(
    Object.keys(resourceCounts).reduce((obj, resource) => {
      obj[resource as keyof ResourceTileCounts] = Array(resourceCounts[resource as keyof ResourceCounts]).fill('');
      return obj;
    }, {} as ResourceTileCounts)
  );

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(playerNames);
    console.log(resourceTileCounts);

    // Clear inputs
    setPlayerNames({
      player1: '',
      player2: '',
      player3: '',
      player4: '',
    });
    const initialResourceTileCounts: ResourceTileCounts = Object.keys(resourceCounts).reduce((obj, resource) => {
      obj[resource as keyof ResourceTileCounts] = Array(resourceCounts[resource as keyof ResourceCounts]).fill('');
      return obj;
    }, {} as ResourceTileCounts);
    setResourceTileCounts(initialResourceTileCounts);

    // Close modal
    setShowModal(false);

    // Pass playerNames to parent component
    onPlayerNamesUpdate(playerNames);
    onNewGame(); // Call the onNewGame function
  };

  const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlayerNames((prevNames) => ({ ...prevNames, [name]: value }));
  };

  const handleResourceTileChange = (e: React.ChangeEvent<HTMLInputElement>, resource: keyof ResourceTileCounts, index: number) => {
    const { value } = e.target;
    setResourceTileCounts((prevCounts) => ({
      ...prevCounts,
      [resource]: prevCounts[resource].map((count, i) =>
        i === index ? value : count
      ),
    }));
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="game-buttons">
        <button
          className="button bg-black hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={() => setShowModal(true)}
        >
          Start New Game
        </button>
      </div>
      {showModal && (
        <Modal isVisible={showModal} onClose={handleModalClose}>
          <form onSubmit={handleFormSubmit}>
            <div className="form-section">
              <h2 className="font-bold text-xl">Player Names</h2>
              <input
                type="text"
                name="player1"
                placeholder="Player 1"
                value={playerNames.player1}
                onChange={handlePlayerNameChange}
              />
              <input
                type="text"
                name="player2"
                placeholder="Player 2"
                value={playerNames.player2}
                onChange={handlePlayerNameChange}
              />
              <input
                type="text"
                name="player3"
                placeholder="Player 3"
                value={playerNames.player3}
                onChange={handlePlayerNameChange}
              />
              <input
                type="text"
                name="player4"
                placeholder="Player 4"
                value={playerNames.player4}
                onChange={handlePlayerNameChange}
              />
            </div>
            <div className="form-section">
              <h2 className="font-bold text-xl">Resource Tile Counts</h2>
              {Object.keys(resourceCounts).map((resource) => (
                <div key={resource}>
                  <h3 className="font-bold">{resource}</h3>
                  {resourceTileCounts[resource as keyof ResourceTileCounts].map(
                    (count, index) => (
                      <input
                        key={index}
                        type="number"
                        placeholder={`Tile ${index + 1}`}
                        value={count}
                        onChange={(e) =>
                          handleResourceTileChange(
                            e,
                            resource as keyof ResourceTileCounts,
                            index
                          )
                        }
                        className="input-box"
                      />
                    )
                  )}
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="button align-middle bg-black hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              Submit
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default NewGame;
