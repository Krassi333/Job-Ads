const { body } = require('express-validator');
const router = require('express').Router();
const { register, login } = require('../services/userServices');
const { parseError } = require('../util/parser');

router.get('/register', (req, res) => {
    res.render('register', {
        title: "Register Page"
    })
});

module.exports = router;