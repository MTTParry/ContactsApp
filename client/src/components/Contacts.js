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
            Phone number: {contact.phone}
            <br />
            Email: {contact.email}
            <br />
            Address: {contact.address}
            <br />
            {contact.city}, {contact.postalcode} {contact.country}
            <hr></hr>
          </li>
        ))}
      </ul>
      <Form addContact={addContact} />
    </div>
  );
}

export default Contacts;
