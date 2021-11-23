const router = require('express').Router();

const { mailCheck } = require('../miscellaneous/mailCheck');
const { token } = require('../miscellaneous/tokenGen');

// Req 3, create endpoint POST /login, where it must return a token upon receival of VALID email and pwd
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email) { return res.status(400).json({ message: 'O campo "email" é obrigatório' }); }
  const checkedMail = mailCheck(email);

  if (!checkedMail) {
 return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
}

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
 
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  
  res.status(200).json({ token: token() });
});

module.exports = router;
