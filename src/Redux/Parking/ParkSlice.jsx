import { createSlice } from '@reduxjs/toolkit';

const parkSlice = createSlice({
  name: 'parks',
  initialState: [],
  reducers: {
    addParkData: (state, action) => {
      state.push(action.payload);
      console.log('Data added:', action.payload);
    },
    deleteParkData: (state, action) => {
      console.log('Delete action received:', action.payload); // Log the delete action payload
      const { seatNumber, selectedDate } = action.payload;
      const newState = state.map(park => {
        if (park.selectedDate === selectedDate) {
          return {
            ...park,
            bookedSeats: park.bookedSeats.filter(seat => seat !== seatNumber),
          };
        }
        return park;
      }).filter(park => park.bookedSeats.length > 0); // Remove entries with no booked seats

      console.log('New state after deletion:', newState); // Log the new state
      return newState;
    }
  }
});

export const { addParkData, deleteParkData } = parkSlice.actions;
export default parkSlice.reducer;
