const express = require('express');
const { contactsController } = require('./controllers');

const app = express();

app.use(express.json());

// app.get(
//   '',
//   () => {},
//   () => {},
//   () => {}
// );

// app.get(
//   '/',
//   (req, res, next) => {
//     // основні дії
//     console.log('validation');
//     next();
//   },
//   (req, res, next) => {
//     console.log('db');
//     res.status(200).send();
//   }
// );

// /contacts

// GET http://localhost:5000/contacts?page=1&results=3
app.get('/contacts', contactsController.getContacts);

// POST http://localhost:5000/contacts
app.post('/contacts', contactsController.createContact);

// GET http://localhost:5000/contacts/555654
app.get('/contacts/:id', contactsController.getContactById);

// PATCH http://localhost:5000/contacts/555654
app.patch('/contacts/:id', contactsController.updateContactById);

// DELETE http://localhost:5000/contacts/555654
app.delete('/contacts/:id', contactsController.deleteContactById);

// GET /notebooks/135456 - параметр маршрута
// GET /notebooks?page=2 - параметри рядка запиту
// params/query - string!!!

module.exports = app;
