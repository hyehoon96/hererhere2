import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice.js';
import mapReducer from './slices/mapSlice.js'

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    map: mapReducer
  },
});

export default store;
