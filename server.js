const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'smart-brain'
    }
});

//console.log(db.select ('*').from('users'));

const app = express();

app.use(express.json());
app.use(cors());

const database = {
    users:[
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    // res.send('This is working!');
    res.json(database.users);
})

app.post('/signin', (req,res) =>{
    // // Load hash from your password DB.
    // bcrypt.compare("bacon", hash, function(err, res) {
    //     // res == true
    // });

    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json(database.users[0]);
        // res.json('success')
    } else {
        res.status(400).json('error logging in')
    }
})

app.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    // bcrypt.hash("bacon", null, null, function(err, hash) {
    //     // Store hash in your password DB.
    // });

    db('users')
        .returning('*')
        .insert({
            name: name,
            email: email,
            joint: new Date()
    })
    .then(user => {
        res.json(user[0]);
    })
    .catch(err => res.status(400).json('unable to register'))
})

app.get('/profile/:id', (req,res) => {
    const { id } = req.params;
    
    db.select('*').from('users').where({id})
    .then(user => {
        if(user.length){
            res.json(user[0]);
        } else {
            res.status(400).json('User not found')
        }
    })
    .catch(err => res.status(400).json('Error getting user'))
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    
    db('users').where('id','=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Error getting entries'))
})

app.listen(3000, () => {
    console.log('App is running in port 3000');
})

/*  --- API PLANNIFICATION ---
/ -> res = This is working!
/signin -> POST = sucess or fail
/register -> POST = user
/profile/:userId -> GET = user
/image -> PUT -> user
*/