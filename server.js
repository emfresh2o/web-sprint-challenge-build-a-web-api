const express = require('express');

const helmet = require('helmet');

const server = express();

const actionRouter = require('./data/routers/projectRouter.js');
const projectRouter = require('.routers/actionRouter.js');

server.use(express.json());
server.use(helmet());
server.use((error, req, res, next) => {
  console.log(err);
  res.status(error.code).json({ error });
});

server.get('/', (req, res) => {
  res.status(200).json({ message: 'The Server is LIVE!' });
});

server.use('/api/action', actionRouter);
server.use('/api/project', projectRouter);

module.exports = server;
