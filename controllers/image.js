const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '7fe35e96d698480cb1b258517335443e'
});

const handlerApiCall = (req, res) => {
    app.models
    .predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))

}

const handlerImage = (req, res, db) => {
    const { id } = req.body;
    
    db('users').where('id','=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Error getting entries'))
}

module.exports = {
    handlerImage,
    handlerApiCall
}