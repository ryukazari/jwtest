const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();


app.listen(3001, () => {
    console.log('server on port 3001');
});



app.get('/', (req, res) => {
    res.json({
        text: 'api works'
    })
});

app.post('/api/login', (req, res) => {
    const user = { id: 3 };
    const token = jwt.sign({ user }, 'my_secret_key');
    res.json({
        token
    });
});

app.get('/api/protected', ensureToken, (req, res) => {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                text: 'protegido',
                data
            })
        }
    })
});

function ensureToken(req, res, next) {
    const bearerheader = req.headers['authorization'];
    if (typeof bearerheader != 'undefined') {
        const bearer = bearerheader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken
        next();
    } else {
        res.sendStatus(403);
    }
}