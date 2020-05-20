const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'smart-brain'
    }
});

const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {res.json(database.users)})

app.post('/signin', (req, res) => signin.handlerSignin(req, res, db, bcrypt))
app.post('/register', (req, res) => register.handlerRegister(req, res, db, bcrypt))
app.get('/profile/:id', (req, res) => profile.handlerProfileGet(req, res, db))
app.put('/image', (req, res) => image.handlerImage(req, res, db))

app.listen(3000, () => {
    console.log('App is running in port 3000');
})