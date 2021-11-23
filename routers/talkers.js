const router = require('express').Router();

const { readData, writeData } = require('../miscellaneous/readFile');
const { tokenChecker } = require('../middlewares/tokenChecker');
const { 
  talkerChecker, 
  objectTalkCheckerDateRate, 
  objectTalkerChecker,
} = require('../middlewares/talkerChecker');

const data = 'talker.json';

// Req 7, Get talkers by search term through params, 
// it must come first, otherwise when request GET /search 
// it would be interpreted as /:id
router.get('/search', tokenChecker, async (req, res) => {
  const { q } = req.query;
  const talkers = await readData(data);

  if (!q) return res.status(200).json(talkers);

  const filteredTalkers = talkers.filter((talker) => talker.name.includes(q));

  if (!filteredTalkers) return res.status(200).json([]);

  res.status(200).json(filteredTalkers);
});

// Req 1, create endpoint GET for /talker, where returns all the talkers for the lecture
router.get('/', async (_req, res) => {
  const talkers = await readData(data);

  if (!talkers) res.status(200).json([]);
  res.status(200).json(talkers);
});

// Req 2, create endpoint GET for /:id, where return a talker based on searched id from params
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readData(data);
  const talkerFound = talkers.find((talker) => talker.id === Number(id));
  if (!talkerFound) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
 
  res.status(200).json(talkerFound);
});

// Req 4, create endpoint POST for /talker, must run checks on token, name, age, talk, if all meet the criteria return 201 + person
router.post('/',
 tokenChecker, talkerChecker, objectTalkerChecker, objectTalkCheckerDateRate, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const newTalker = {
    id: 5,
    name,
    age,
    talk: { watchedAt, rate },
  };
  const talkers = await readData(data);
  const newList = [...talkers, newTalker];

  try {
    await writeData(data, newList);
  } catch (err) {
    return res.status(400).json({ message: `${err.message}` });
  }

  res.status(201).json(newTalker);
});

// Req 5, create endpoint PUT to edit talkers
router.put('/:id', 
tokenChecker, talkerChecker, objectTalkerChecker, objectTalkCheckerDateRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const newTalker = {
    name,
    age,
    id,
    talk,
  };
  const talkers = await readData(data);

  let updatedTalkers = talkers.filter((talker) => talker.id !== parseInt(id, 10));
  updatedTalkers = [...updatedTalkers, newTalker];
  await writeData(data, updatedTalkers);
  console.log(newTalker);
  res.status(200).json(newTalker);
});

// Req 6, delete endpoint to delete talker
router.delete('/:id', tokenChecker, async (req, res) => {
  const { id } = req.params;

  const talkers = await readData(data);
  const updatedTalkers = talkers.filter((talker) => talker.id !== parseInt(id, 10));
  await writeData(data, updatedTalkers);
  
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;