const { registerUser } = require('@features/users/register-user-command');

const registerNewUser = async (req, res) => {
    try {
        const createdUser = await registerUser(req.body);
        res.status(200).json(createdUser);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    registerNewUser
}