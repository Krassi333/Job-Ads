const { Schema, model } = require('mongoose');

//TODO Add User properties and validations acording to the assignment
const userSchema = new Schema({
    username: { type: String, required: true,minlength:[3,'Username must be at least 3 charecters long!'] },
    hashedPassword: { type: String, required: true }
});

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;