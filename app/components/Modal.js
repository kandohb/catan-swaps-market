
import React, {useState} from 'react';


const Modal = ({ isVisible, onClose, children }) => {
  const[isModalVisible, setIsModalVisible] = useState(isVisible);

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
    setIsModalVisible(false);
  }

  const handleAreaClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  }

  if (!isModalVisible) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-md flex justify-center items-center' id="wrapper"
    onClick={handleAreaClose}>
      <div className='width-[600px] flex flex-col'>
        <button className='text-white text-xl top-0 right-0 place-self-end' onClick={handleClose}>X</button>
        <div className='bg-white rounded-xl shadow-lg p-4 text-black'>{children}</div>
      </div>
    </div>
  )

}

export default Modal;