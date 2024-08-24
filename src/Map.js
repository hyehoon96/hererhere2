import React, { useEffect, useCallback, useRef } from 'react';
import SideDrawer from './components/SideDrawer'
import 'bootstrap/dist/css/bootstrap.min.css';
import useKakaoMap from './hooks/useKakaoMap'; // 새로 만든 커스텀 훅
import { useDispatch, useSelector } from 'react-redux';

const { kakao } = window;

function Map() {
  const { 
    map, 
    markers, 
    currentMarker, 
    initializeMap, 
    handleMapClick, 
    displayPlace, 
    removeAllMarker, 
    addNewMarker 
  } = useKakaoMap();

  const clickListenerRef = useRef(null);
  const $places = useSelector(state => state.place.places);

  useEffect(() => {
    initializeMap();
  }, [initializeMap]);

  useEffect(() => {
    if (map) {
      if (clickListenerRef.current) {
        kakao.maps.event.removeListener(map, 'click', clickListenerRef.current);
      }

      clickListenerRef.current = handleMapClick;
      kakao.maps.event.addListener(map, 'click', clickListenerRef.current);

      return () => {
        if (clickListenerRef.current) {
          kakao.maps.event.removeListener(map, 'click', clickListenerRef.current);
        }
      };
    }
  }, [map, handleMapClick]);

  return (
    <div className="d-flex h-100vh">
      <SideDrawer onMark={addNewMarker} onPlaces={displayPlace} removeAllMarker={removeAllMarker}/>
      <div id="map" style={{width: 'calc(100vw - 390px)', height: '100vh'}}></div>

      {
        $places &&
        <button 
          className="btn btn-primary" 
          style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 2 }}
          onClick={() => alert('Button clicked!')}
        >
          { $places.length }
        </button>
      }    
    </div>
  );
}

export default Map;