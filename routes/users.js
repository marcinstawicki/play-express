const express = require('express');
const csurf = require('csurf');
const path = require('path');
const csrfMiddleware = csurf({cookie: true});
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '../public/uploads')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    }),
    limits: {fileSize: 1024},
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            cb(new Error(file.mimetype), false);
        }
    }
}).single('my_file');
const {body, validationResult} = require('express-validator');

const uploadMiddleware = function (req, res, next) {
    return upload(req, res, function (err) {
        if (err) {
            res.locals.uploadError = err;
        }
        next();
    });
};

const router = express.Router();
/**
 * sign up
 */
let signUpVars = (req, errors) => {
    return {
        title: 'sign up',
        errors: errors,
        instructions: 'Please sign up (Your data is stored only in session)',
        forenameLabel: 'forename',
        surnameLabel: 'surname',
        emailLabel: 'email',
        passwordLabel: 'password',
        fileLabel: 'file',
        csrfToken: req.csrfToken(),
        body: req.body
    }
};
router.get('/sign-up', csrfMiddleware, function (req, res, next) {
    res.render('sign-up', signUpVars(req, []));
});
router.post('/sign-up',
    [
        body('forename','forename only letters').trim().isLength({min: 1, max: 20}).isAlpha(),
        body('surname', 'surname only letters').trim().isLength({min: 1, max: 30}).isAlpha(),
        body('email','email format').trim().isLength({min: 10, max: 100}).isEmail(),
        body('password','strong password format').trim().isLength({min: 8, max: 15}).isStrongPassword()
    ],
    uploadMiddleware,
    csrfMiddleware,
    function (req, res) {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            errors = errors.array();
            console.log(errors);
        } else {
            errors = [];
        }
        if (res.locals.uploadError) {
            errors = [...errors, res.locals.uploadError]
        }
        if (errors.length > 0) {
            res.render('sign-up', signUpVars(req, errors));
        } else {
            res.send('sign-up POST' + JSON.stringify(req.body) + JSON.stringify(req.file));
        }
    });
/**
 * sign in
 */
router.get('/sign-in/:reason?', csrfMiddleware, function (req, res) {
    const reason = req.params.reason ? req.params.reason : '';
    req.session.user = {
        forename: 'Marcin',
        surname: 'Stawicki',
    };
    res.send('sign in GET ' + reason);
});
router.post('/sign-in', csrfMiddleware, function (req, res) {
    res.send('sign in POST');
});
/**
 * reset password
 */
router.get('/reset-password', csrfMiddleware, function (req, res) {
    res.send('reset password GET');
});
router.post('/reset-password', csrfMiddleware, function (req, res) {
    res.send('reset password POST');
});
/**
 * sign out
 */
router.get('/sign-out', function (req, res) {
    req.session.user = undefined;
    res.redirect('/');
});
module.exports = router;
