const rand = () => Math.random().toString(36).substr(2); 

const token = () => (rand() + rand()).slice(0, 16); 

module.exports = { token };
