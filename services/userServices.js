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

async function login(username, password) {
    const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Incorect username or password!');
    }

    const passwordCheck = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordCheck) {
        throw new Error('Incorect username or password!');
    }

    const token = createSesion(user);
    return token;
}

async function logout() {

}

function verifyToken(token) {
    return jwt.verify(token, secret);
}

function createSesion({ _id, username }) {
    const payload = {
        _id,
        username
    }

    const token = jwt.sign(payload, secret);

    return token;
}

module.exports = {
    register,
    login,
    logout,
    verifyToken
}