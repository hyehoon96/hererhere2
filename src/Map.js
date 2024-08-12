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

  const handleAddrSearch = (coords) => {
    // 결과값으로 받은 위치를 마커로 표시합니다
    var marker = new kakao.maps.Marker({
      position: coords
    });

    marker.setMap(map);
    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
    map.setCenter(coords);
  }

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

  const markAndSetCenter = (coords) => { 
    new kakao.maps.Marker({
      map: map,
      position: coords
    });
    map.setCenter(coords);
  }

  return (
    <div className="d-flex">
      <SideDrawer handleAddressSearchMap={markAndSetCenter}/>
      <div id="map" style={{width: '70vw', height: '100vh'}}></div>
    </div>
  );
}

export default Map;