import React, { useEffect, useCallback, useRef } from 'react';
import SideDrawer from './components/SideDrawer'
import 'bootstrap/dist/css/bootstrap.min.css';
import useKakaoMap from './hooks/useKakaoMap'; // 새로 만든 커스텀 훅
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
    </div>
  );
}

export default Map;