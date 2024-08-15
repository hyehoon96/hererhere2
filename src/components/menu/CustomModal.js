import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CustomModal({isModalOpen, modalType, setIsModalOpen}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    console.log('여호와~~');
    setShow(isModalOpen);
  }, [isModalOpen])
  const handleClose = () => {
    setShow(false);
    setIsModalOpen(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      { 
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> 채팅방 </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            채팅방 목록
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </>
  );
}

export default CustomModal;