import React, { useState } from "react";
import Seats from "./Seats";
import { useSelector } from 'react-redux';
import Continue from "../components/Countinue";

export default function Outline() {
  const TotalSeat = 30; // Set the total number of seats here
  const seatsArray = Array.from({ length: TotalSeat }, (_, index) => index + 1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for showing the confirmation modal
  const [userDetails, setUserDetails] = useState(null); // State for user details
  const bookedSeats = useSelector(state =>
    state.parks
      .filter(park => park.selectedDate === selectedDate)
      .map(park => ({
        bookedSeats: park.bookedSeats,
        userDetails: {
          username: park.username,
          mobileNumber: park.mobileNumber,
          selectedDate: park.selectedDate,
          bookedSeats: park.bookedSeats,
        }
      }))
  );

  // const dispatch = useDispatch();

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedSeats([]);
  };

  const handleSeatSelection = (seatNumber) => {
    // Toggle seat selection
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(prevSelectedSeats => prevSelectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats(prevSelectedSeats => [...prevSelectedSeats, seatNumber]);
    }
  };

  const handleContinue = () => {
    setShowModal(true); // Show the confirmation modal
  };

  const handleModalClose = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="flex flex-col items-center my-10 p-8 bg-black rounded-xl shadow-xl">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-6">Parking</h1>
      <div className="border border-dashed border-indigo-500 w-full max-w-4xl p-8 bg-gray-600 rounded-lg shadow-lg">
        <input 
          type="date" 
          value={selectedDate}
          onChange={handleDateChange}
          className="mb-4 p-2 border border-gray-300 rounded text-gray-900 mx-auto block bg-white"
        />
        {selectedDate ? (
          <div className="grid grid-cols-10 gap-2">
            {seatsArray.map(seatNumber => {
              const bookedSeatDetails = bookedSeats.find(seat => seat.bookedSeats.includes(seatNumber));
              return (
                <Seats
                  key={seatNumber}
                  seatNumber={seatNumber}
                  isSelected={selectedSeats.includes(seatNumber)}
                  handleSeatSelection={handleSeatSelection}
                  isBooked={!!bookedSeatDetails}
                  userDetails={bookedSeatDetails ? bookedSeatDetails.userDetails : null}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-center text-white text-xl mt-4">Please select a date to view available seats.</p>
        )}
        <Continue selectedDate={selectedDate} selectedSeats={selectedSeats} onClick={handleContinue} setSelectedSeats={setSelectedSeats}/>
      </div>
    </div>
  );
}
