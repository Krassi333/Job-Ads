const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const secret = 'erdfcv67gbl';

async function register(username, password) {
    const existing = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existing) {
        throw new Error('Username is taken!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        hashedPassword
    });
    //TODO check if registation creates session by assignment
    const token = createSesion(user);

    return token;
}

module.exports = {
    register,
    login,
    logout,
    verifyToken
}