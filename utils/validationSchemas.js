const yup = require('yup');

module.exports.CREATE_CONTACT_VALIDATION_SCHEMA = yup.object({
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
