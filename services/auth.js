/**
 * you needn't write it yourself but use "passport" middleware
 * I want to create a middleware so I am doing it ...
 */
module.exports = (req, res, next) => {
    if(!req.session.user){
        res.redirect('/users/sign-in/auth');
    } else {
        next();
    }
};