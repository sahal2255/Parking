import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addParkData } from '../Redux/Parking/ParkSlice'; // Adjust the import path as necessary

function Modal({ isOpen, onClose, selectedSeats, selectedDate,setSelectedSeats }) {
  const [username, setUsername] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault(); // Ensure e is defined and prevent default behavior
    dispatch(addParkData({ bookedSeats:selectedSeats, selectedDate, username, mobileNumber }));
    setUsername('')
    setMobileNumber('')
    setSelectedSeats([])
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-black p-6 rounded-md shadow-md">
        <h2 className="text-lg font-medium mb-4">User Information</h2>
        <h2>{selectedDate}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
        // Add required attribute for validation
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Mobile Number</label>
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md  text-black"
        // Add required attribute for validation
            />
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="p-2 bg-red-600 text-white rounded-md">Close</button>
            <button type="submit" className="p-2 bg-blue-600 text-white rounded-md">Submit</button>
          </div> 
          </form>
      </div>
    </div>
  );
}

export default Modal;
