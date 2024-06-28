import React, { useState } from 'react';
import Modal from './Modal'; // Adjust the import path as necessary

export default function Continue({ selectedSeats, selectedDate, setSelectedSeats }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {selectedDate && (
        <div className="flex flex-col items-center p-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          >
            Continue
          </button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            selectedSeats={selectedSeats}
            selectedDate={selectedDate}
            setSelectedSeats={setSelectedSeats}
          />
        </div>
      )}
    </>
  );
}
