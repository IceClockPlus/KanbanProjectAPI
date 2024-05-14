const argon2 = require('argon2');
const User = require('@domain/entities/user.model');
const jwt = require('jsonwebtoken');

const authenticateUserCommand = async (request)  => {
    const user = await User.findOne({email: request.email}).exec();
    if(user == null) return {
        success: false,
        message: 'Not registered'
    };
    const isPasswordMatch = await argon2.verify(user.password, request.password);
    if(!isPasswordMatch) {
        return {
            success: false,
            message: 'Incorrect password'
        };
    }
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({
        userId: user._id,
    }, jwtSecret,{
        expiresIn: '1h',
        algorithm: 'HS256'
    });
    console.log(token);
    return {
        success: true,
        message: 'Login sucessfully',
        token: token
    };
};

module.exports.authenticateUserCommand = authenticateUserCommand;

