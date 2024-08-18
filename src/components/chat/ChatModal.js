import { useEffect, useState } from 'react';
import { Button, Modal, ListGroup, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { enterRoom, setRooms } from '../../store/slices/chatSlice.js';

function CustomModal({isModalOpen, modalType, setIsModalOpen}) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const rooms = useSelector(state => state.chat.rooms);

  useEffect(() => {
    console.log('여호와~~');
    // 채팅방 목록 받아올 것
    setShow(isModalOpen);
  }, [isModalOpen])
  const handleClose = () => {
    setShow(false);
    setIsModalOpen(false);
  };

  const enterChatRoom = (room) => {
    // Redux에 채팅방 정보 저장
    dispatch(enterRoom(room));
    handleClose();
    // 채팅방 UI 렌더링
  }
  const renderModalContent = () => {
    if (modalType === '채팅방 찾기') {
      return (
        <ListGroup>
          {
            rooms.map(room => (
              <ListGroup.Item key={room.id} action onClick={() => enterChatRoom(room)}>
                {room.name}
              </ListGroup.Item>
            ))
          }
        </ListGroup>
      );
    } else if (modalType === '채팅방 만들기') {
      return (
        <Form>
          <Form.Group className="mb-3" controlId="formChatRoomName">
            <Form.Label>채팅방 이름</Form.Label>
            <Form.Control type="text" placeholder="채팅방 이름을 입력하세요" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formChatRoomDesc">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" placeholder="채팅방 설명을 입력하세요" />
          </Form.Group>
        </Form>
      );
    } else {
      return null;
    }
  };
  return (
    <>
      { 
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> 채팅방 </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {renderModalContent()}
          </Modal.Body>
          {
            
            <Modal.Footer>    
              <Button variant="secondary" onClick={handleClose}>
                닫기
              </Button>
              {
              modalType === '채팅방 만들기' &&
              <Button variant="primary" onClick={handleClose}>
                생성
              </Button>
              } 
            </Modal.Footer>
          }
        </Modal>
      }
    </>
  );
}

export default CustomModal;