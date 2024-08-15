import { Card, Button, ButtonGroup, ToggleButtonGroup, ToggleButton  } from 'react-bootstrap';

function MenuButtonGroup() {
  return (
    <ToggleButtonGroup className='d-flex' type="radio" name="options" defaultValue={null}>
      <ToggleButton className="menu-group-button" id="tbg-radio-1" value={1}>
        채팅방 찾기
      </ToggleButton>
      <ToggleButton className="menu-group-button" id="tbg-radio-2" value={2}>
        채팅방 만들기
      </ToggleButton>
      <ToggleButton className="menu-group-button" id="tbg-radio-3" value={3}>
        오류제보
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

function PlaceCard({ header, searchComponent, listComponent, paginationComponent }) {
  return (
    <Card>
      <Card.Header as="h5">HereThere2 - 중간에서 만나요!</Card.Header>
      <Card.Body>
        <div className="card-action-group">
          {searchComponent}
          <div>
            <MenuButtonGroup />
          </div>
          <Card.Title></Card.Title>
          <Card.Text></Card.Text>  
        </div>
        <div className="card-list-group">
          {listComponent}
        </div>
      </Card.Body>
      <div className="card-footer d-grid">
        {paginationComponent}
        <Button style={{borderRadius: '0'}} variant="info" size="md">Go somewhere</Button>
      </div>
    </Card>
  )
}

export default PlaceCard;