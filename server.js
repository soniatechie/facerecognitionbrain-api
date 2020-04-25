const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('This is working!')
})

app.listen(3000, () => {
    console.log('App is running in port 3000');
})

/* 
/ -> res = This is working!
/signin -> POST = sucess or fail
/register -> POST = user
/profile/:userId -> GET = user
/image -> PUT -> user
*/