import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    currentRoom: null,
    rooms: [],
  },
  reducers: {
    enterRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
  },
});

export const { enterRoom, setRooms } = chatSlice.actions;
export default chatSlice.reducer;