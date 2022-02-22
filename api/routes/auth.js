const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/User');

//Register user
router.post('/register', async (request, response) => {
    try {
        // generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.body.password, salt);
        const sluggedUsername = '@' + request.body.username.toLowerCase().split(' ').join('');

        // create new user
        const newUser = new User({
            username: request.body.username,
            slug: sluggedUsername,
            email: request.body.email,
            password: hashedPassword,
        })

        //save user and return response
        const user = await newUser.save();
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json(error);
    }
})

//Login user
router.post('/login',  async (request, response) => {
    try {
        //Wrong email
        const user = await User.findOne({email: request.body.email});
        !user && response.status(404).send('User not found!');

        //Wrong password
        const validPassword = await bcrypt.compare(request.body.password, user.password);
        !validPassword && response.status(400).json('Wrong password!');

        //Correct email and password
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json(error);
    }
})

module.exports = router;