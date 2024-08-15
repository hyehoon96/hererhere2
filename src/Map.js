import React, { useEffect, useState, useCallback, useRef } from 'react';
import SideDrawer from './components/SideDrawer'
import 'bootstrap/dist/css/bootstrap.min.css';

const { kakao } = window;

function Map() {
  const [map, setMap] = useState(null);
  /**현재 지도 위 마커를 담고 있는 배열 */
  const [markers, setMarkers] = useState([]);
  /**선택된 마커 */
  const [currentMarker, setcurrentMarker] = useState(null);
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
    
    if(currentMarker) {
      currentMarker.setMap(null);
    }      
    
    const newcurrentMarker = new kakao.maps.Marker({ 
      position: latlng,
    });
    
    newcurrentMarker.setMap(map);
    setcurrentMarker(newcurrentMarker);
    console.log('Set currentMarker!!');
  }, [map, currentMarker]);

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

  const displayPlace = (places) => {
    if(!Array.isArray(places)) {
      return
    }
    removeMarker();
    console.log(places);
    const bounds = new kakao.maps.LatLngBounds();
    const tempMarkers = [];

    for(const place of places) {
      const placePosition = new kakao.maps.LatLng(place.y, place.x);
      const marker = addMarker(placePosition) ;
      tempMarkers.push(marker);
      bounds.extend(placePosition);
    }

    setMarkers(tempMarkers);
    map.setBounds(bounds);
  }

  /**마커 핸들링 */
  const removeMarker = (paramMarker) => {
    if (paramMarker) {
      // 해당 마커만 remove
      return
    }
    for (const marker of markers) {
      marker.setMap(null);
    }
    setMarkers([]);
  }

  const addMarker = (coords) => { 
    const marker = new kakao.maps.Marker({
      position: coords
    });
    
    marker.setMap(map);
    map.setCenter(coords);
    return marker
  }

  return (
    <div className="d-flex h-100vh">
      <SideDrawer onMark={addMarker} onPlaces={displayPlace} removeMarker={removeMarker}/>
      <div id="map" style={{width: 'calc(100vw - 390px)', height: '100vh'}}></div>
    </div>
  );
}

export default Map;