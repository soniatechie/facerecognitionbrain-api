const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
// postgresql-spherical-05454

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
});

const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {res.send('it is working!')})

app.post('/signin', (req, res) => signin.handlerSignin(req, res, db, bcrypt))
app.post('/register', (req, res) => register.handlerRegister(req, res, db, bcrypt))
app.get('/profile/:id', (req, res) => profile.handlerProfileGet(req, res, db))
app.put('/image', (req, res) => image.handlerImage(req, res, db))
app.post('/imageurl', (req, res) => image.handlerApiCall(req, res))


app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running in port ${process.env.PORT}` );
})