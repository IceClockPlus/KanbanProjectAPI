const argon2 = require('argon2');
const User = require('@domain/entities/user.model');

const registerUser = async (request) => {
    const hash = await argon2.hash(request.password, {type: argon2.argon2i});
    const user = new User({
        name: request.name,
        lastName: request.lastName,
        password: hash,
        email: request.email,
        avatar: null
    });
    await user.save();

    return {
        id: user._id,
        name: user.name,
        lastName: user.lastName
    };

};

module.exports.registerUser = registerUser;
