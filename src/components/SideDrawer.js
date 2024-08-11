import { useState, useEffect } from 'react';
import { Form, InputGroup, Button, Card,  } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

const { kakao } = window;

function PlaceList({places}) {
  console.log(places)
  return (
    <ListGroup as="ol" numbered>
      {
        places.map((item, index) => {
          return (
            <ListGroup.Item
              key={item.id}
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{item.place_name}</div>
                {item.address_name}
                <div>
                {item.category_name}
                </div>
              </div>
              <Badge bg="primary" pill>
                {item.category_group_name}
              </Badge>
            </ListGroup.Item>
          )
        })
      }
    </ListGroup>
  );
}

function Search({ onDataSend }) {
  let [ps, setPs] = useState(null);
  let [searchWord, setSearchWord] = useState('');
  let [places, setPlaces] = useState([]);
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      setPs(new window.kakao.maps.services.Places());
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

  const placeSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면
      // 검색 목록과 마커를 표출합니다
      //displayPlaces(data);
      // 페이지 번호를 표출합니다
      //displayPagination(pagination);
      setPlaces(data);
      onDataSend(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
    alert('검색 결과 중 오류가 발생했습니다.');
      return;
    }
  }


  return (
    <>
      <Form onSubmit={handleSearch}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="장소를 입력하세요"
          aria-label="장소를 입력하세요"
          aria-describedby="basic-addon2"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <Button variant="info" id="button-addon2" type="submit">
          @
        </Button>
      </InputGroup>
    </Form>
    </>
  );
}
function SideDrawer() {
  let [places, setPlaces] = useState([]);

  const handleDataFromChild = (data) => {
    setPlaces(data);
    console.log("부모 컴포넌트에서 받은 데이터:", data);
  };

  return (
    <Card>
      <Card.Header as="h5">Herethere</Card.Header>
      <Card.Body>
        <Search onDataSend={handleDataFromChild}></Search>
        <Card.Title>장소목록~</Card.Title>
        <Card.Text>
          몇 군데 찾았어요.
        </Card.Text>
        <div>
          <PlaceList places={places}></PlaceList>
        </div>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default SideDrawer;