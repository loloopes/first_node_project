// Check talker name and age
function talkerChecker(req, res, next) {
  const { name, age } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

// Object talk checker for date and rate
function objectTalkCheckerDateRate(req, res, next) {
  const {
    talk: { watchedAt, rate },
  } = req.body;
  const regexDate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  if (!regexDate.test(watchedAt)) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (rate < 1 || rate > 5) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}

// Object check rather watchedAt and rate are in the body and
function objectTalkerChecker(req, res, next) {
  const { talk } = req.body;

  if (!talk) {
    return res
      .status(400)
      .json({
        message:
          'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      }); 
  }

  if (!('watchedAt' in talk) || !('rate' in talk)) {
    return res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
}

module.exports = {
  talkerChecker,
  objectTalkCheckerDateRate,
  objectTalkerChecker,
};
