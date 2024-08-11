import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Search() {
  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="장소를 입력하세요"
          aria-label="장소를 입력하세요"
          aria-describedby="basic-addon2"
        />
        <Button variant="info" id="button-addon2" >
          @
        </Button>
      </InputGroup>
    </>
  );
}
function SideDrawer() {
  return (
    <Card>
      <Card.Header as="h5">Herethere</Card.Header>
      <Card.Body>
        <Search></Search>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default SideDrawer;