/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Mock Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => ({ email, password });

module.exports = {
  loginUserWithEmailAndPassword,
};
