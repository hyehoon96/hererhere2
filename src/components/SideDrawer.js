import { useState, useEffect } from 'react';
import PlaceCard from './common/PlaceCard';
import PlaceSearch from './common/PlaceSearch'
import PlaceList from './common/PlaceList';
import PlacePagination from './common/PlacePagination';

const { kakao } = window;

function SideDrawer({onMark}) {
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = (data) => {
    if(Array.isArray(data)) {
      setSearchResult(data);
      console.log(data);
    } else {
      onMark(data);
    }
  }
  
  return (
    <>
      <PlaceCard
        searchComponent={<PlaceSearch onSearch={handleSearch} />}
        listComponent={<PlaceList places={searchResult}/>}
        paginationComponent={<PlacePagination />}
      /> 
    </>
  );
}

export default SideDrawer;