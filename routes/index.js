const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const vars = {
    user: req.session.user,
    title: 'Play Express',
    introduction: 'this is home page of the APP',
    authTrueInfo: 'you are ',
    authFalseInfo: 'you are anonymous',
    signUp: 'sign up',
    signIn: 'sign in',
    signOut: 'sign out',
    mainEntity: 'main entity'
  };
  res.render('index', vars);
});

module.exports = router;
