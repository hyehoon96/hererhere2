import { useEffect, useState } from 'react';
import { Button, Modal, ListGroup, Form, Badge} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { enterRoom, setRooms } from '../../../store/slices/chatSlice.js';
import { database } from '../../../firebase.js';
import { ref, get, push, set } from "firebase/database";
import { serverTimestamp } from "firebase/database";
import { useChat } from '../../../hooks/useChat.js';  // 새로 추가된 import

function CustomModal({isModalOpen, modalType, setIsModalOpen}) {
  const dispatch = useDispatch();
  const { enterChatRoom } = useChat();  // 커스텀 훅 사용

  /** Modal 상태 */
  const [show, setShow] = useState(false);

  /** 채팅방 목록 */
  const [rooms, setRooms] = useState([]);
  
  /** 채팅방 생성 시 입력 값 체크 */
  const [titleLength, setTitleLength] = useState(0);
  const [pwLength, setPwLength] = useState(0);
  const [aliasLength, setAliasLength] = useState(0);
  /** 채팅방 생성 시 입력 값 */
  const [newRoomTitle, setNewRoomTitle] = useState('');
  const [newRoomPw, setNewRoomPw] = useState('');
  const [newRoomAlias, setNewRoomAlias] = useState('');
  /** 채팅방 접속 시 채팅방정보 */
  const [passwords, setPasswords] = useState({});
  const [selectedRoom, setSelectedRoom] = useState(null);



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
          title: roomsData[roomId].info.title,
          curUsers: roomsData[roomId].info.curUsers,
          maxUsers: roomsData[roomId].info.maxUsers,
          hasPassword: !!roomsData[roomId].info.password
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
    clearInput();
    setShow(false);
    setIsModalOpen(false);
  };

  const clearInput = () => {
    setTitleLength(0);
    setPwLength(0);

  }

  const checkPw = async (room) => {
    try {
      const roomRef = ref(database, `rooms/${room.id}`);
      const snapshot = await get(roomRef);

      if (snapshot.exists()) {
        const roomData = snapshot.val();
        if (roomData.info.password === passwords[room.id]) {
          enterChatRoom(room);
          handleClose();
        } else {
          alert("비밀번호가 일치하지 않습니다.");
        }
      } else {
        console.log("Room not found.");
        alert("채팅방을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("Error checking password:", error);
      alert("비밀번호 확인 중 오류가 발생했습니다.");
    }
  };

  const handleEnterChatRoom = () => {
    if (selectedRoom) {
      if (selectedRoom.hasPassword) {
        checkPw(selectedRoom);
      } else {
        enterChatRoom(selectedRoom);
        handleClose();
      }
    } else {
      alert("채팅방을 선택해주세요.");
    }
  };

  const handlePasswordChange = (roomId, password) => {
    setPasswords(prev => ({ ...prev, [roomId]: password }));
  };

  const checkInputLength = (e, type, maximum) => {
    const value = e.target.value;
    const valueLength = value.length;
    if (valueLength <= maximum) {
      switch(type) {
        case 'title':
          setTitleLength(valueLength);
          setNewRoomTitle(value);
          break;
        case 'pw':
          setPwLength(valueLength);
          setNewRoomPw(value);
          break;
        case 'alias':
          setAliasLength(valueLength);
          setNewRoomAlias(value);
          break;
      }
    }
  };

  const handleRoomListClick = (room) => {
    setSelectedRoom(room)
    if(!room.hasPassword) {
      enterChatRoom(room);
    }
  }

  const createChatRoom = async () => {
    try {
      console.log("Starting room creation");
      const roomsRef = ref(database, 'rooms');
      console.log("Room reference created");
      
      const newRoomRef = await push(roomsRef);
      console.log("New room reference pushed:", newRoomRef.key);
  
      const curDate = serverTimestamp();
  
      const participantsRef = ref(database, `rooms/${newRoomRef.key}/participants`);
      const messagesRef = ref(database, `rooms/${newRoomRef.key}/messages`);
  
      const newRoomInfo = {
        info: {
          title: newRoomTitle,
          password: newRoomPw,
          createdAt: curDate,
          maxUsers: 4,
          curUsers: 1
        },
        participants: {
          [push(participantsRef).key]: {
            name: newRoomAlias
          }
        },
        messages: {
          [push(messagesRef).key]: {
            name: newRoomAlias,
            text: `${newRoomAlias}님이 입장하셨습니다.`,
            timestamp: curDate
          }
        }
      };
  
      await set(newRoomRef, newRoomInfo);
  
      console.log('채팅방이 성공적으로 생성되었습니다.');
      handleClose();
      fetchChatRoom();
    } catch (error) {
      console.error('채팅방 생성 중 오류 발생:', error);
      console.error(error.stack);
      alert('채팅방 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const renderModalContent = () => {
    if (modalType === '채팅방 찾기') {
      return (
        <ListGroup>
          {rooms.map(room => (
            <ListGroup.Item 
              key={room.id} 
              action 
              onClick={() => handleRoomListClick(room)}
              active={selectedRoom && selectedRoom.id === room.id}
            >
              <details>
                <summary>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                  }}>
                    <span>{room.title} {room.hasPassword && <span>🔒</span>}</span>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <Badge bg="primary" pill style={{ height: 'fit-content', fontSize: '13px' }}>
                        {room.curUsers} / {room.maxUsers}
                      </Badge>
                    </div>
                  </div>
                </summary>
                {room.hasPassword && (
                  <Form.Group className="mt-3" controlId={`formChatRoomDesc-${room.id}`}>
                    <Form.Control 
                      type="password"
                      placeholder="비밀번호를 입력하세요."
                      value={passwords[room.id] || ''} 
                      onChange={e => handlePasswordChange(room.id, e.target.value)}
                      onClick={e => e.stopPropagation()}
                    />
                  </Form.Group>
                )}
              </details>
            </ListGroup.Item>
          ))}
        </ListGroup>
      );
    } else if (modalType === '채팅방 만들기') {
      return (
        <Form>
          <Form.Group className="mb-3" controlId="formChatRoomName">
            <Form.Label>참가자별명 ({aliasLength} / 8)</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="별명을 정해주세요. (8자 이하)"
              value={newRoomAlias}
              onChange={(e) => {checkInputLength(e, 'alias', 8)}}
              minLength={1}
              maxLength={8}  
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formChatRoomName">
            <Form.Label>채팅방 이름 ({titleLength} / 20)</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="채팅방 이름을 입력하세요. (20자 이하)"
              value={newRoomTitle}
              onChange={(e) => {checkInputLength(e, 'title', 20)}}
              minLength={1}
              maxLength={20}  
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formChatRoomDesc">
            <Form.Label>비밀번호 ({pwLength} / 12)</Form.Label>
            <Form.Control 
              type="password"
              placeholder="채팅방 비밀번호를 입력하세요. (4~12자리)"
              value={newRoomPw}
              onChange={(e) => {checkInputLength(e, 'pw', 12)}}
              minLength={4}
              maxLength={12}  
            />
          </Form.Group>
        </Form>
      );
    } else {
      return null;
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> 채팅방 </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderModalContent()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          {modalType === '채팅방 찾기' && (
            <Button variant="primary" onClick={handleEnterChatRoom}>
              접속
            </Button>
          )}
          {modalType === '채팅방 만들기' && (
            <Button variant="primary" onClick={createChatRoom}>
              생성
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomModal;