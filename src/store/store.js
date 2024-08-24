import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice.js';
import placeReducer from './slices/placeSlice.js'

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    place: placeReducer,
  },
});

export default store;
