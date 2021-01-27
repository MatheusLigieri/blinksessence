const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs')
const config = require('./config.json');
const consign = require('consign');

module.exports = () => {
    const app = express();
    // SETANDO VARIÁVEIS DA APLICAÇÃO
    app.set('port', process.env.PORT || config.server.port);
    console.log(config.path.home)
    app.set('view engine', 'ejs');
    // MIDDLEWARES
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, '../pages')));
    // ENDPOINTS
    consign({ cwd: 'api' })
        .then('controllers')
        .then('routes')
        .into(app)
    return app;
};