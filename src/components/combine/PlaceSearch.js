import { useState, useEffect } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

const { kakao } = window;

function PlaceSearch({ onSearch, onSendingPageObj }) {
  const [ps, setPs] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      setPs(new window.kakao.maps.services.Places());
      setGeocoder(new kakao.maps.services.Geocoder());
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if(ps) {
      ps.keywordSearch(searchWord, placeSearchCB);
    }
  }

  const placeSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      onSearch(data);
      onSendingPageObj(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      geocoder.addressSearch(searchWord, addressSearchCB)
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
    }
  }

  const addressSearchCB = (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      onSearch(coords);
    }
  }

  return (
    <Form onSubmit={handleSearch}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="장소를 입력하세요"
          aria-label="장소를 입력하세요"
          aria-describedby="basic-addon2"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <Button variant="primary" id="button-addon2" type="submit">@</Button>
      </InputGroup>
    </Form>
  );
}

export default PlaceSearch;