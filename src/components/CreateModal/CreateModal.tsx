import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type CreateModalProps = {
    show: boolean;
    onClose: () => void;
    onDelete: () => void;
}

function CreateModal({ show, onClose, onDelete }: CreateModalProps) {
    const handleDelete = () => {
        onDelete();
        onClose();
    };

    return (
        <div>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete this contact?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CreateModal;