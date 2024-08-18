import { useState, useEffect } from 'react';
import PlaceCard from './place/PlaceCard';
import PlaceSearch from './place/PlaceSearch'
import CommonList from './common/CommonList';
import CommonPagination from './common/CommonPagination';
import { Badge, Pagination } from 'react-bootstrap';

function SideDrawer({onMark, onPlaces, removeAllMarker }) {
  const [places, setPlaces] = useState([]);
  const [pagination, setPagination] = useState({});
  
  const handleSearch = (data) => {
    if(Array.isArray(data)) {
      console.log('키워드 검색!');
      
      setPlaces(data);
      onPlaces(data);
    } else {
      console.log('주소 검색!');
      onMark(data);
    }
  }

  const handlePagination = (data) => {
    // 검색결과 pagination 객체 정보를 state에 담는다.
    setPagination(data);
  }

  const renderPlaceItem = (item) => (
    <div className="d-flex justify-space-between align-items-star" style={{width: '100%'}}>
      <div className="ms-2 me-auto">
        <div className="fw-bold">{item.place_name}</div>
        {item.address_name}
        <div>{item.category_name}</div>
      </div>
      <div>
        <Badge bg="info" pill style={{height:'fit-content'}}>{item.category_group_name}</Badge>
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
          onClick={(clickEvent) => {pagination.gotoPage(i+1); removeAllMarker();}}
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