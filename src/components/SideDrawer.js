import { useState, useEffect } from 'react';
import { Form, InputGroup, Button, Card } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

const { kakao } = window;

function PlaceList({places}) {
  console.log(places)
  return (
    <ListGroup as="ol" numbered>
      { places.map((item) => (
        <ListGroup.Item key={item.id} as="li" className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">{item.place_name}</div>
            {item.address_name}
            <div>{item.category_name}</div>
          </div>
          <Badge bg="primary" pill>{item.category_group_name}</Badge>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

function Search({ onDataSend, onAddressSearch }) {
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
      searchPlaces();
    }
  }

  const searchPlaces = () => {
    ps.keywordSearch(searchWord, placeSearchCB);
  }

  const placeSearchCB = (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      onDataSend(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      geocoder.addressSearch(searchWord, addressSearchCB)
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
    }
  }

  const addressSearchCB = (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      onAddressSearch(coords);
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
        <Button variant="info" id="button-addon2" type="submit">@</Button>
      </InputGroup>
    </Form>
  );
}

function SideDrawer({handleAddressSearchMap}) {
  const [places, setPlaces] = useState([]);

  const handleDataFromChild = (data) => {
    setPlaces(data);
    console.log("부모 컴포넌트에서 받은 데이터:", data);
  };

  const handleAddressSearch = (coords) => {
    // 여기에 주소 검색 결과를 처리하는 로직을 추가하세요
    handleAddressSearchMap(coords);
  };

  return (
    <Card>
      <Card.Header as="h5">Herethere</Card.Header>
      <Card.Body>
        <Search onDataSend={handleDataFromChild} onAddressSearch={handleAddressSearch} />
        <Card.Title>장소목록~</Card.Title>
        <Card.Text>몇 군데 찾았어요.</Card.Text>
        <div>
          <PlaceList places={places} />
        </div>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default SideDrawer;