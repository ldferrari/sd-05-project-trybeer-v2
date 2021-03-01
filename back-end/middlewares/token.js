const unauthorizedDataCode = 401;
const tokenLength = 16;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(unauthorizedDataCode).json({ message: 'Token não encontrado' });
  }
  if (String(token).length !== tokenLength) {
    return res.status(unauthorizedDataCode).json({ message: 'Token inválido' });
  }
  next();
};
