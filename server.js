const express = require('express'); // remember to install your npm packages
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');  
const server = express();

server.use(express.json());

const User = require('./auth/UserModel');

server.get('/',(req, res) => {
    res.status(200).json({ api: 'running...'})
})

server.post('/post', (req, res) => {
    const { username, password } = req.body;
    //save the user to the database
    User.create({ username, password })
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: err})
    })
})

server.post('/api/login', (req, res)=>{
    //grab credentials
    const { username, password } = req.body;

    //find the user to get acess to the store page
    User.findOne({ username})
    .then(user => {
        if(user) {
            //compare passwords to guess the stored password
            user   
                .validatePassword(password)
                .then(passwordMatch => {
                    if(passwordMatch) {
                        res.send('logging in successful')
                    } else {
                        res.status(401).send('invalid credentials')
                    }
                })
                .catch( err => {
                    res.send('error comparing passwords')
                })
            } else {
                //if not found
                res.status(401).end('invalid credentials')
            }
        })
        .catch(err => {
            res.send(err)
        })
    })


// add your server code

mongoose.connect('mongodb://localhost/cs10_testing', {}, (err => {
    err ? console.log(err) : console.log('Mongoose is connected to our Database')
}))

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server up and running on ${port}`);
});
