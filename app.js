const express = require('express');
const { contactsController } = require('./controllers');
const yup = require('yup');
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

const CREATE_CONTACT_VALIDATION_SCHEMA = yup.object({
  name: yup
    .string()
    .trim()
    .min(2)
    .max(16)
    .matches(/^[A-Z][a-z]{1,15}$/)
    .required(),
  telNumber: yup
    .string()
    .trim()
    .length(13)
    .matches(/^\+380\d{9}$/)
    .required(),
  birthday: yup.date().max(new Date()),
});
const validateContactOnCreate = async (req, res, next) => {
  const { body } = req;
  try {
    const validatedContact = await CREATE_CONTACT_VALIDATION_SCHEMA.validate(
      body
    );
    req.body = validatedContact;
    next();
  } catch (err) {
    res.status(422).send(err.errors);
  }
};

// POST http://localhost:5000/contacts
app.post(
  '/contacts',
  validateContactOnCreate,
  contactsController.createContact
);

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
