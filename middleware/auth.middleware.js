const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user.model');
require("dotenv").config()

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization || null
        if(!token) {
            return res.status(401).json({isError:true, message: 'Please login to access' });
        }
        const decoded = jwt.verify(token,process.env.jtwSecret)
        if(!decoded) {
            return res.status(401).json({isError:true, message: 'Please login to access' });
        }
        const {userId} = decoded
        const user = await UserModel.findById(userId)
        console.log(user)
        req.user = user
        next();
    } catch (error) {
        console.log(error)
        return res.status(404).json({isError:true,message: error.message});
    }
}

module.exports = {
    auth
}