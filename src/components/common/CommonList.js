import { ListGroup } from 'react-bootstrap';

function CommonList({ lists, renderItem }) {
  return (
    <ListGroup as="ol" numbered>
      {lists.map((item, index) => (
        <ListGroup.Item key={item.id || index} as="li" className="d-flex align-items-start">
          {renderItem(item)}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default CommonList;