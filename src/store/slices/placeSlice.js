import { createSlice } from '@reduxjs/toolkit';

const placeReducer = createSlice({
  name: 'place',
  initialState: {
    places: [],
    centerPoint: {}
  },
  reducers: {
    addPlaces: (state, action) => {
      state.places.push(action.payload);
    },
    clearPlaces: (state) => {
      state.places = [];
    },
    setCenterPoint: (state, action) => {
      state.centerPoint = action.payload;
    }
  },
});
// 리듀서 외부에서 로깅
const addPlacesWithLogging = (place) => (dispatch, getState) => {
  dispatch(addPlaces(place));
  console.info(getState().place.places);
};

const calcCenterPoint = (place) => (dispatch, getState) => {
  let currentPlaces = getState().place.places;
  let currentPlacesLength = currentPlaces.length;
  if (currentPlacesLength === 0) {
    return; 
  }

  let sumX = 0;
  let sumY = 0;

  for (let coord of currentPlaces) {
    sumX += parseFloat(coord.x);
    sumY += parseFloat(coord.y);
  }

  dispatch(setCenterPoint({
    x: sumX / currentPlacesLength,
    y: sumY / currentPlacesLength
  }));
  console.log(getState().place.centerPoint);
}

export { addPlacesWithLogging, calcCenterPoint };
export const { addPlaces, clearPlaces, setCenterPoint } = placeReducer.actions;
export default placeReducer.reducer;