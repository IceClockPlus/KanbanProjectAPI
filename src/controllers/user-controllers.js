const { registerUser } = require('@features/users/register-user-command');
const { authenticateUserCommand } = require('@features/users/authenticate-user');

const registerNewUser = async (req, res) => {
    try {
        const createdUser = await registerUser(req.body);
        res.status(200).json(createdUser);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const authenticateUser =  async (req, res) => {
    try{
        const authResponse = await authenticateUserCommand(req.body);
        if(!authResponse.success){
            res.status(401).json({ message: authResponse.message});
        } else {
            res.status(200).json(authResponse);
        }
    }catch(error) {
        res.status(500).json({message: error.message});
    }
};

const getMyInfo = async (req, res) => {
    res.status(200).json({ user: req.user});
}

module.exports = {
    registerNewUser,
    authenticateUser,
    getMyInfo
}