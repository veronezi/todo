const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require("path");
const fs = require('fs');

const jsonParser = bodyParser.json();

const getKeyPath = (envVar, fileName) => path.resolve(process.env[envVar], fileName);
const publicKeyPath = getKeyPath('PUBLIC_KEY_DIR', 'todo_rsa.pub');
const privateKeyPath = getKeyPath('PRIVATE_KEY_DIR', 'todo_rsa');

const app = express();
const port = 3000;

const publicKey = fs.readFileSync(publicKeyPath, "utf8");
const privateKey = fs.readFileSync(privateKeyPath, "utf8");

const auth = (username, password, expiresIn) => jwt.sign({
    upn: username,
    sub: username,
    iss: 'todo-auth',
    aud: 'todo',
    groups: ['todo']
}, privateKey, {
    expiresIn: expiresIn || '24h',
    algorithm: 'RS256'
});

module.exports.auth = auth;
module.exports.publicKey = publicKey;
module.exports.start = () => {
    app.post('/auth', jsonParser, (req, res) => res.send(auth(req.body.username, req.body.password, req.body.expiresIn)));
    app.get('/publickey', (req, res) => res.send(publicKey));
    app.listen(port, () => console.log(`App listening on port ${port}!`));
};
