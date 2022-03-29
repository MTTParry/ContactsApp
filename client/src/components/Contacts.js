import { useState, useEffect } from "react";
import Form from "./AddContactForm";

function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5005/api/contacts")
      .then((response) => response.json())
      .then((contacts) => {
        setContacts(contacts);
      });
  }, []);

  const addContact = (newContact) => {
    console.log(newContact);
    setContacts((contacts) => [...contacts, newContact]);
  };

  //  const deleteContact
  const deleteContact = async (id) => {
    try {
      const deleteResponse = await fetch(
        `http://localhost:5005/api/contacts/${id}`,
        {
          method: "DELETE",
        }
      );
      if (deleteResponse.status === 200) {
        setContacts(contacts.filter((contact) => contact.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="contacts">
      <h2> List of Contacts </h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {" "}
            <b>
              {contact.firstname} {contact.lastname}
            </b>
            :
            <br />
            <i>Phone number</i>: {contact.phone}
            <br />
            <i>Email</i>: {contact.email}
            <br />
            <i>Address</i>: {contact.address}
            <br />
            {contact.city}, {contact.postalcode} {contact.country}
            <br />
            <i>Notes</i>: {contact.notes}
            <br />
            <button
              className="deletebuttons"
              key={contact.id}
              value={contact.id}
              onClick={() => deleteContact(contact.id)}
            >
              Delete {contact.firstname}
            </button>
            <div className="note">CAREFUL: Delete cannot be undone.</div>
            <hr></hr>
          </li>
        ))}
      </ul>
      <Form addContact={addContact} />
    </div>
  );
}

export default Contacts;
