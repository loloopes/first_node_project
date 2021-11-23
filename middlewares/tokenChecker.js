function tokenChecker(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization;

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length < 16) return res.status(401).json({ message: 'Token inválido' });
  
  next();
}

module.exports = { tokenChecker };
