const fs = require('fs').promises;

async function readData(file) {
  const stringfyFile = await fs.readFile(`${file}`, 'utf-8');
  const parsedData = JSON.parse(stringfyFile);
  return parsedData;
}

async function writeData(file, talkerList) {
  const data = JSON.stringify(talkerList);
  await fs.writeFile(`./${file}`, data);
}

module.exports = { readData, writeData };