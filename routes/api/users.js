const express = require('express');
const uuid = require('uuid')
const router = express.Router();
const users = require('../../Users');
const async = require('async');
const sendEmail = require('./send-email');


// Get all users
router.get('/', (req, res) => {
    res.json(users);
});


// Get single user
router.get('/:id', (req, res) => {
    const user = users.filter(user => user.id === parseInt(req.params.id));

    if (user.length > 0){
        res.json(user[0]);
    } else {
        res.status(404).json({msg: 'user not found'})
    }
});


// create a new user
router.post('/', (req,res) => {
    var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

    const emailValidation = re.test(req.body.email);

    if(emailValidation) {

        const newUser = {
            id: uuid.v4(),
            name: req.body.name,
            email: req.body.email
        }

        if( !newUser.name || !newUser.email){
            return res.status(400).json({msg : "please enter a name and email"})
        }

        users.push(newUser);

        async.parallel([
            function (callback) {
              sendEmail(
                callback,
                'info@tammam.com',
                [newUser.email],
                'Mesa 3alek',
                'A7la mesa 3alek',
                '<p style="font-size: 32px;">A7la mesa 3alek</p>'
              );
            }
          ], function(err, results) {
            res.send({
              success: true,
              message: 'Emails sent',
              successfulEmails: results[0].successfulEmails,
              errorEmails: results[0].errorEmails,
            });
          });

        res.send(newUser);


    } else {
        res.status(400).json({msg: "please enter valid email"})
    }

})




module.exports = router;