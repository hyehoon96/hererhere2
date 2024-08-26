// useChat.js
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../store/slices/chatSlice';

export function useChat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const enterChatRoom = (room) => {
    dispatch(enterRoom(room));
    navigate(`/room/${room.title}`);
  };

  return { enterChatRoom };
}