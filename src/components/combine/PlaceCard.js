import { Card, Button, ToggleButtonGroup, ToggleButton  } from 'react-bootstrap';
import CustomModal from '../feature/chat/ChatModal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { calcCenterPoint } from '../../store/slices/placeSlice';


function PlaceCard({ searchComponent, listComponent, paginationComponent }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const dispatch = useDispatch();


  const openModal = (item) => {
    setIsModalOpen(true);
    setModalType(item);
  }
  
  return (
    <>
      <Card>
        <Card.Header as="h5">HereThere2 - 중간에서 만나요!</Card.Header>
        <Card.Body>
          <div className="card-action-group">
            {searchComponent}
            <div>
              <ToggleButtonGroup className='d-flex' type="radio" name="options" defaultValue={null}>
                {
                  ['채팅방 찾기', '채팅방 만들기', '오류 제보'].map( (item, index) => {
                    return (  
                      <ToggleButton 
                        key={index} 
                        className="menu-group-button"
                        id={`tbg-radio-${index+1}`} 
                        value={index+1} 
                        onClick={() => openModal(item)}>
                        {item}
                      </ToggleButton>
                    ) 
                  })
                }
              </ToggleButtonGroup>
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
          <Button style={{borderRadius: '0'}} variant="primary" size="md" onClick={() => {dispatch(calcCenterPoint())}}>Go somewhere</Button>
        </div>
      </Card>
      <CustomModal isModalOpen={isModalOpen} modalType={modalType} setIsModalOpen={setIsModalOpen}/>
    </>
  )
}

export default PlaceCard;