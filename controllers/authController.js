const createError = require('http-errors');

const userDb = {
  'test@mail.com': {
    id: '1',
    name: 'Test',
    email: 'test@mail.com',
    password: 'qwerty',
  },
};

module.exports.login = (req, res, next) => {
  const {
    body: { email, password },
  } = req;

  if (!(email in userDb)) {
    return next(createError(404, 'User Not Found'));
  }

  if (userDb[email].password !== password) {
    return next(createError(401, 'Email or password is not correct'));
  }

  const preparedUser = { ...userDb[email] };
  delete preparedUser.password;

  res.status(200).send(preparedUser);
};

module.exports.signUp = (req, res, next) => {
  const { body } = req;

  if (body.email in userDb) {
    return next(createError(409, 'User is already exists'));
  }

  const createdUser = { ...body, id: Date.now() };
  userDb[body.email] = createdUser;

  const preparedUser = { ...createdUser };
  delete preparedUser.password;

  res.status(201).send(preparedUser);
};
