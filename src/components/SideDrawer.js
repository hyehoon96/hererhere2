import { useState, useEffect } from 'react';
import PlaceCard from './common/PlaceCard';
import PlaceSearch from './common/PlaceSearch'
import PlaceList from './common/PlaceList';
import PlacePagination from './common/PlacePagination';

function SideDrawer({onMark, onPlaces, removeMarker }) {
  const [places, setPlaces] = useState([]);
  const [pagination, setPagination] = useState({});

  const handleSearch = (data) => {
    if(Array.isArray(data)) {
      console.log('handleSearch!');
      setPlaces(data);
      onPlaces(data);
    } else {
      console.log(data);
      onMark(data);
    }
  }

  const handlePagination = (data) => {
    setPagination(data);
  }

  const handlePageChange = (data) => {
    removeMarker();
  }

  return (
    <>
      <PlaceCard
        searchComponent={<PlaceSearch onSearch={handleSearch} onPagination={handlePagination}/>}
        listComponent={<PlaceList places={places}/>}
        paginationComponent={<PlacePagination pagination={pagination} onPageChange={handlePageChange}/>}
      /> 
    </>
  );
}

export default SideDrawer;