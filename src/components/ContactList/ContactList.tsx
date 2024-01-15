import './ContactList.scss';
import type { ContactType } from '../Contact/Contact';
import Contact from "../Contact/Contact";
type ContactListProps = {
    contacts: ContactType[];
    onDelete: (contactId: number) => void;
}

function ContactList({ contacts }: ContactListProps) {
    return (
        <div>
            <h1 className="contact__title">Contacts</h1>
            {contacts.map(contact => (
                <Contact key={contact.name} contact={contact} />
            ))}
        </div>
    );
}

export default ContactList;