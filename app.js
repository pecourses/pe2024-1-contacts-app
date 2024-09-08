const express = require('express');
const { contactsController, authController } = require('./controllers');
const { validate, errorHandlers } = require('./middleware');

const app = express();

app.use(express.json());

app.post('/login', authController.login);
app.post('/signUp', authController.signUp);

app.get('/contacts', contactsController.getContacts);
app.post(
  '/contacts',
  validate.validateContactOnCreate,
  contactsController.createContact
);
app.get('/contacts/:id', contactsController.getContactById);
app.patch(
  '/contacts/:id',
  validate.validateContactOnUpdate,
  contactsController.updateContactById
);
app.delete('/contacts/:id', contactsController.deleteContactById);

app.use(errorHandlers.validationErrorHandler, errorHandlers.errorHandler);

module.exports = app;
