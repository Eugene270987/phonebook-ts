import './Contact.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import CreateModal from '../CreateModal/CreateModal';
import { deleteContact } from '../../store/contacts/contactSlice';

export type ContactType = {
    id: number;
    name: string;
    username: string;
    phone: string;
};

type ContactProps = {
    contact: ContactType;
}

function Contact({ contact }: ContactProps) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    return (
        <div>
            <div key={contact.name}>
                <ul className="contact__list">
                    <li>Name: {contact.name}</li>
                    <li>Username: {contact.username}</li>
                    <li>Phone: {contact.phone}</li>
                    <button className="btn-del" type="button" onClick={() => setShowModal(true)}>
                        Delete
                    </button>
                </ul>
            </div>

            <CreateModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onDelete={() => {
                    dispatch(deleteContact(contact.id));
                    setShowModal(false);
                }}
            ></CreateModal>
        </div>
    );
}

export default Contact;