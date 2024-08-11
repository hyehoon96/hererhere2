import React, { useEffect, useState, useCallback, useRef } from 'react';
import SideDrawer from './components/SideDrawer'
import 'bootstrap/dist/css/bootstrap.min.css';

const { kakao } = window;

function Map() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const clickListenerRef = useRef(null);

  const initializeMap = useCallback(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    const newMap = new kakao.maps.Map(container, options);
    setMap(newMap);
  }, []);

  const handleMapClick = useCallback((mouseEvent) => {
    const latlng = mouseEvent.latLng;
    
    if(marker) {
      marker.setMap(null);
    }      
    
    const newMarker = new kakao.maps.Marker({ 
      position: latlng,
    });
    
    newMarker.setMap(map);
    setMarker(newMarker);
    console.log('Set Marker!!');
  }, [map, marker]);

  useEffect(() => {
    initializeMap();
  }, [initializeMap]);

  useEffect(() => {
    if (map) {
      // 기존 이벤트 리스너 제거
      if (clickListenerRef.current) {
        kakao.maps.event.removeListener(map, 'click', clickListenerRef.current);
      }

      // 새 이벤트 리스너 등록
      clickListenerRef.current = handleMapClick;
      kakao.maps.event.addListener(map, 'click', clickListenerRef.current);
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      if (map && clickListenerRef.current) {
        kakao.maps.event.removeListener(map, 'click', clickListenerRef.current);
      }
    };
  }, [map, handleMapClick]);

  return (
    <div className="d-flex">
      <SideDrawer />
      <div id="map" style={{width: '70vw', height: '100vh'}}></div>
    </div>
  );
}

export default Map;