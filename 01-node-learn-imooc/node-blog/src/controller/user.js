const loginCheck = (username, password) => {
  if (username === 'admin' && password === 'admin') {
    return true
  }
  return false
}

module.exports = {
  loginCheck,
}
