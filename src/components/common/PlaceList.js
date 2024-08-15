import {Badge, ListGroup} from 'react-bootstrap';

function PlaceList({places}) {
  return (
    <ListGroup as="ol" numbered>
      {places.map((item) => (
        <ListGroup.Item key={item.id} as="li" className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">{item.place_name}</div>
            {item.address_name}
            <div>{item.category_name}</div>
          </div>
          <Badge bg="info" pill>{item.category_group_name}</Badge>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default PlaceList;