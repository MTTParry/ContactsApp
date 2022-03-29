const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("../server/db/db-connection.js");

const app = express();

const PORT = 5005;
app.use(cors());
app.use(express.json());

//creates an endpoint for the route /api
app.get("/", (req, res) => {
  res.json({ message: "Hello from My ExpressJS" });
});

//create the get request
app.get("/api/contacts", cors(), async (req, res) => {
  try {
    const { rows: contacts } = await db.query(
      "SELECT * FROM contactlist ORDER BY firstname"
    );
    res.send(contacts);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

//create the POST request
app.post("/api/contacts", cors(), async (req, res) => {
  console.log("Start server request");
  try {
    const newContact = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      postalcode: req.body.postalcode,
      country: req.body.country,
      notes: req.body.notes,
    };
    console.log([newContact]);
    const queryString = `INSERT INTO contactlist ("firstname", "lastname", "phone", "email", "address", "city", "postalcode", "country", "notes", creationtimestamp) VALUES ('${newContact.firstname}', '${newContact.lastname}', '${newContact.phone}', '${newContact.email}', '${newContact.address}', '${newContact.city}', '${newContact.postalcode}', '${newContact.country}', '${newContact.notes}', current_timestamp) RETURNING *`;
    const result = await db.query(queryString);
    console.log("Post contact", result.rows[0]);
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e.message);
  }
});

//Delete contacts by id
app.delete("/api/contacts/:id", async (req, res) => {
  const contactId = req.params.id;
  console.log("Deleting contact id #", contactId);
  await db.query("DELETE FROM contactlist WHERE id=($1)", [contactId]);
  res.send({ status: "successful delete!" });
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
