const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const quotesRouter = require('../quotes/quotes-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/quotes', quotesRouter);

server.get('/', (req, res) => {
  res.status(200).json({ message: 'api is up and running' });
});

module.exports = server;
