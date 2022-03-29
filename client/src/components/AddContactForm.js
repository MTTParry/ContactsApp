import { useState } from "react";

const AddContactForm = (props) => {
  let emptyContact = {
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalcode: "",
    country: "",
    notes: "",
  };

  const [contact, setContact] = useState(emptyContact);

  

  //create functions that handle the event of the user typing into the form
  const handleFirstName = (event) => {
    const firstname = event.target.value;
    setContact((contact) => ({ ...contact, firstname }));
    // console.log(contact);
  };

  const handleLastName = (event) => {
    const lastname = event.target.value;
    setContact((contact) => ({ ...contact, lastname }));
    // console.log(contact);
  };

  const handlePhone = (event) => {
    const phone = event.target.value;
    setContact((contact) => ({ ...contact, phone }));
    // console.log(contact);
  };

  const handleEmail = (event) => {
    const email = event.target.value;
    setContact((contact) => ({ ...contact, email }));
    // console.log(contact);
  };

  const handleAddress = (event) => {
    const address = event.target.value;
    setContact((contact) => ({ ...contact, address }));
    // console.log(contact);
  };

  const handleCity = (event) => {
    const city = event.target.value;
    setContact((contact) => ({ ...contact, city }));
    // console.log(contact);
  };

  const handlePostalCode = (event) => {
    const postalcode = event.target.value;
    setContact((contact) => ({ ...contact, postalcode }));
    // console.log(contact);
  };

  const handleCountry = (event) => {
    const country = event.target.value;
    setContact((contact) => ({ ...contact, country }));
    // console.log(contact);
  };

  const handleNotes = (event) => {
    const notes = event.target.value;
    setContact((contact) => ({ ...contact, notes }));
    // console.log(contact);
  };

  //A function to handle the post request
  const postContact = (newContact) => {
    var results = fetch("http://localhost:5005/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log("From the post ", data);
      });
    return results;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postContact(contact);
    props.addContact(contact);
    setContact(emptyContact);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label>First Name:</label>
        <input
          type="text"
          id="add-contact-firstname"
          placeholder="First Name"
          required
          value={contact.firstname}
          onChange={handleFirstName}
        />
        <br />
        <label>Last Name:</label>
        <input
          type="text"
          id="add-contact-lastname"
          placeholder="Last Name"
          value={contact.lastname}
          onChange={handleLastName}
        />
        <br />
        <label>Phone:</label>
        <input
          type="text"
          id="add-contact-phone"
          placeholder="No spaces and no dashes"
          value={contact.phone}
          onChange={handlePhone}
        />
        <br />
        <label>Email:</label>
        <input
          type="text"
          id="add-contact-email"
          placeholder="name@email.com"
          value={contact.email}
          onChange={handleEmail}
        />
        <br />
        <label>Address:</label>
        <input
          type="text"
          id="add-contact-address"
          placeholder="123 Main St."
          value={contact.address}
          onChange={handleAddress}
        />
        <br />
        <label>City:</label>
        <input
          type="text"
          id="add-contact-city"
          value={contact.city}
          onChange={handleCity}
        />
        <br />
        <label>Postal/Zip Code:</label>
        <input
          type="text"
          id="add-contact-postalcode"
          placeholder="ex: 90210"
          value={contact.postalcode}
          onChange={handlePostalCode}
        />
        <br />
        <label>Country:</label>
        <input
          type="text"
          id="add-contact-country"
          placeholder="ex: United States"
          value={contact.country}
          onChange={handleCountry}
        />
        <br />
        <label>Notes*:</label>
        <input
          type="text"
          id="add-contact-notes"
          placeholder="Any other notes about this person..."
          value={contact.notes}
          onChange={handleNotes}
        />
        <div className="note">*Don't use apostrophes</div>
      </fieldset>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddContactForm;
