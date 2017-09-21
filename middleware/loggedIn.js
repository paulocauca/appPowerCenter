

module.exports = function isLoggedIn (req, res, next) {
 if (!(req.session && req.session.userInf)) {
  return res.redirect('/login');
 }
 next();
};