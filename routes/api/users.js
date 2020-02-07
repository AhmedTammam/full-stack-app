const express = require('express');
const uuid = require('uuid')
const router = express.Router();
const users = require('../../Users')


// Get all users
router.get('/', (req, res) => {
    res.json(users);
});


// Get single user
router.get('/:id', (req, res) => {
    const validId = users.some(user => user.id === parseInt(req.params.id));

    if (validId){
        res.json(users.filter(user => user.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: 'user not found'})
    }
});


// create a new user
router.post('/', (req,res) => {
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }

    if( !newUser.name || !newUser.email){
        return res.status(400).json({msg : "please enter a name and email"})
    }

    users.push(newUser);
    res.send(users)
})




module.exports = router;