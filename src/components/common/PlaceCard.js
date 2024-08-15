import { Card, Button } from 'react-bootstrap';

function PlaceCard({ header, searchComponent, listComponent, paginationComponent }) {
  return (
    <Card>
      <Card.Header as="h5">{header}</Card.Header>
      <Card.Body>
        {searchComponent}
        <Card.Title>장소목록~</Card.Title>
        <Card.Text>몇 군데 찾았어요.</Card.Text>
        <div style={{height: '500px', overflowY: 'auto'}}>
          {listComponent}
        </div>
      </Card.Body>
      <div className="card-footer">
        {paginationComponent}
        <Button variant="primary">Go somewhere</Button>
      </div>
    </Card>
  )
}

export default PlaceCard;