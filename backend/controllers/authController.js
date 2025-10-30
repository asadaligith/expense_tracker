const User = require('../models/User.js');
const jwt = require('jsonwebtoken');


//  Generate jwt token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn: '1h'});
}

//  Regster user 
exports.registerUser = async (req, res) =>{
     console.log("Received body:", req.body);  

    const {fullname, email, password , profileImageUrl} = req.body;

    if(!fullname || !email || !password){
        return res.status(400).json({message: 'Please provide all required fields'});
    }
    try {
        //  check if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({message: 'User already exists'});
        }
        //  create new user
        const user = await User.create({
            fullname,
            email,
            password,   
            profileImageUrl
        })
    
        res.status(201).json({
            id: user._id,
            user,
            token : generateToken(user._id),
        });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({message: 'Server error'});
    }
};

//  Login user 
exports.loginUser = async (req, res) => {
     const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: 'Please provide all required fields'});
    }
    try {
        //  check if user exists
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({message: 'Invalid credentials'});
        }

        res.status(200).json({
            id: user._id,
            user,
            token : generateToken(user._id),
        });
    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).json({message: 'Server error'});
    }

};

//  Get user info
exports.getUserInfo = async (req, res) => {}