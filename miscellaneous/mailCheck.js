function mailCheck(email) {
  const regex = /.+@.+\..+/;
  return regex.test(email);
}

module.exports = { mailCheck };
