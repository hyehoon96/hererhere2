import { useState, useEffect } from 'react';
import PlaceCard from './combine/PlaceCard';
import PlaceSearch from './combine/PlaceSearch'
import CommonList from './common/CommonList';
import CommonPagination from './common/CommonPagination';
import { Button, Badge, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addPlacesWithLogging } from '../store/slices/placeSlice';

function SideDrawer({onMark, onPlaces, removeAllMarker }) {
  const dispatch = useDispatch();
  const [places, setPlaces] = useState([]);
  const [pagination, setPagination] = useState({});
  
  const handleSearch = (data) => {
    if(Array.isArray(data)) {
      // 키워드 검색      
      setPlaces(data);
      onPlaces(data);
    } else {
      // 주소검색
      onMark(data);
    }
  }

  const handlePagination = (data) => {
    // 검색결과 pagination 객체 정보를 state에 담는다.
    setPagination(data);
  }

  const renderPlaceItem = (item) => (
    <div className="d-flex justify-content-between align-items-start" style={{width: '100%'}}>
      <div className="ms-2 me-auto">
        <div className="fw-bold">{item.place_name}</div>
        {item.address_name}
        <div>{item.category_name}</div>
      </div>
      <div className="d-flex flex-column justify-content-end" style={{ width: 'auto' }}>
        <Badge bg="info" pill style={{ height: 'fit-content', fontSize: '13px' }}>{item.category_group_name}</Badge>
        <Badge bg="secondary" pill style={{ height: 'fit-content', fontSize: '13px', marginTop: '10px' }}
          onClick={() => { dispatch(addPlacesWithLogging({x:item.x, y:item.y})) }}
        >출발지 담기</Badge>
      </div>
    </div>
  );

  const renderPagination = () => {
    const tempItem = [];
    for(let i = 0; i < pagination.last; i++) {
      tempItem.push(
        <Pagination.Item
          key={i + 1}
          active={i+1 === pagination.current}
          onClick={() => {pagination.gotoPage(i+1); removeAllMarker();}}
        >
          {i + 1}
        </Pagination.Item>
      )
    }
      
    return tempItem;    
  }

  return (
    <>
      <PlaceCard
        searchComponent={<PlaceSearch onSearch={handleSearch} onSendingPageObj={handlePagination}/>}
        listComponent={<CommonList lists={places} renderItem={renderPlaceItem}/>}
        paginationComponent={<CommonPagination renderItem={renderPagination}  />}
      /> 
    </>
  );
}

export default SideDrawer;