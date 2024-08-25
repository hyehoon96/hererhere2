import { useEffect, useState } from 'react';
import { Button, Modal, ListGroup, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { enterRoom, setRooms } from '../../../store/slices/chatSlice.js';
import { database } from '../../../firebase.js';
import { ref, get } from "firebase/database";

function CustomModal({isModalOpen, modalType, setIsModalOpen}) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  // const rooms = useSelector(state => state.chat.rooms);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // 채팅방 목록 받아올 것
    if (isModalOpen) {
      fetchChatRoom()
    }
    setShow(isModalOpen);
  }, [isModalOpen])

  const fetchChatRoom = async () => {
    try {
      const roomsRef = ref(database, 'rooms');
      const snapshot = await get(roomsRef);

      if (snapshot.exists()) {
        const roomsData = snapshot.val();
        console.log(roomsData);
        const roomsList = Object.keys(roomsData).map(roomId => ({
          id: roomId,
          ...roomsData[roomId].info, // 각 방의 info 정보 가져오기
        }));
        console.log(roomsList);
        setRooms(roomsList);
      } else {
        console.log("No rooms found.");
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  }


  const handleClose = () => {
    console.log("handleClose");
    setShow(false);
    setIsModalOpen(false);
  };

  const enterChatRoom = (room) => {
    // Redux에 채팅방 정보 저장
    dispatch(enterRoom(room));
    // handleClose();
    // 채팅방 UI 렌더링
  }
  const renderModalContent = () => {
    if (modalType === '채팅방 찾기') {
      return (
        <ListGroup>
          {
            rooms.map(room => (
              <ListGroup.Item key={room.id} action onClick={() => enterChatRoom(room)}>
                <details>
                  <summary>{room.title}</summary>
                  <Form.Group className="mt-3" controlId="formChatRoomDesc">
                    <Form.Control type="password" placeholder="비밀번호를 입력하세요." />
                  </Form.Group>
                </details>
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
              {    
                <Button variant="secondary" onClick={handleClose}>
                  닫기
                </Button>
              }
              {    
                modalType === '채팅방 찾기' &&
                <Button variant="primary" onClick={handleClose}>
                  접속
                </Button>
              }
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