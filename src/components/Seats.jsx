import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteParkData } from '../Redux/Parking/ParkSlice';

export default function Seats({ seatNumber, isSelected, handleSeatSelection, isBooked, userDetails }) {
  const [showModal, setShowModal] = useState(false);
  const [currentUserDetails, setCurrentUserDetails] = useState(null);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (isBooked) {
      console.log(`Booked seat clicked: ${seatNumber}`);
      setCurrentUserDetails(userDetails);
      setShowModal(true);
    } else {
      handleSeatSelection(seatNumber);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentUserDetails(null);
  };

  const handleDelete = () => {
    dispatch(deleteParkData({ seatNumber, selectedDate: currentUserDetails.selectedDate }));
    setShowModal(false);
  };

  return (
    <>
      <div
        className={`flex flex-col items-center p-4 rounded-md shadow-md w-16 cursor-pointer ${
          isBooked ? 'bg-red-400 cursor-pointer' : isSelected ? 'bg-green-500' : 'bg-blue-100'
        }`}
        onClick={handleClick}
      >
        <h2 className='text-lg mx-auto font-medium text-blue-600'>
          {seatNumber}
        </h2>
      </div>
      {showModal && (
        <div className="fixed text-center inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-black p-8 rounded shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">User Details</h2>
            <div className="mb-4">
              <p><strong>Username:</strong> {currentUserDetails?.username}</p>
              <p><strong>Mobile Number:</strong> {currentUserDetails?.mobileNumber}</p>
              <p><strong>Selected Date:</strong> {currentUserDetails?.selectedDate}</p>
              <p><strong>Booked Seats:</strong> {currentUserDetails?.bookedSeats?.join(', ')}</p>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleModalClose}
                className="p-2 bg-gray-800 rounded text-white mr-2"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="p-2 bg-red-600 rounded text-white"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
