const invalidDataCode = 400;
const conflictCode = 409;
const unauthorizedDataCode = 401;
const notFoundCode = 404;

module.exports = (err, _req, res, _next) => {
  const { message, code } = err;
  if (code === 'invalid_data') {
    res.status(invalidDataCode).json({ message });
  }
  if (code === 'conflict') {
    res.status(conflictCode).json({ message });
  }
  if (code === 'unauthorized_data') {
    res.status(unauthorizedDataCode).json({ message });
  }
  if (code === 'invalid_user') {
    res.status(unauthorizedDataCode).json({ message });
  }
  if (code === 'not_found') {
    res.status(notFoundCode).json({ message });
  }
};
