const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { errors } = require('celebrate');

const connection = require('./database/connection');


const app = express();

connection;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;