import { useState, useCallback, useEffect, useRef } from 'react';

const { kakao } = window;

function useKakaoMap() {
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [currentMarker, setCurrentMarker] = useState(null);
  const removeMarkerRef = useRef(null);

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
    
    const newCurrentMarker = new kakao.maps.Marker({ 
      position: latlng,
    });
    
    newCurrentMarker.setMap(map);
    setCurrentMarker(newCurrentMarker);
  }, [map, currentMarker]);

  const removeAllMarker = (() => {
    console.log(markers);
    if(markers) {
      markers.forEach(marker => {marker.setMap(null);});
      setMarkers([]); 
    }
  });

  removeMarkerRef.current = removeAllMarker;

  const addNewMarker = useCallback((position) => {
    const marker = new kakao.maps.Marker({ position });
    marker.setMap(map);
    setMarkers((prevMarkers) => [...prevMarkers, marker]);  // 기존 markers 배열에 새로운 marker를 추가한 배열로 상태 업데이트
    // 키워드 검색 시 setCenter를 여러 번 호출함. 분기처리 필요
    map.setCenter(position);
  }, [map]);

  const displayPlace = useCallback((places) => {
    if(!Array.isArray(places)) return;

    removeMarkerRef.current();
    const bounds = new kakao.maps.LatLngBounds();
    places.forEach(place => {
      const placePosition = new kakao.maps.LatLng(place.y, place.x);
      addNewMarker(placePosition);
      bounds.extend(placePosition);
    });

    map.setBounds(bounds);
  }, [map, addNewMarker]);

  return { 
    map, 
    markers, 
    currentMarker, 
    initializeMap, 
    handleMapClick, 
    displayPlace, 
    removeAllMarker: removeMarkerRef.current, 
    addNewMarker 
  };
}

export default useKakaoMap;