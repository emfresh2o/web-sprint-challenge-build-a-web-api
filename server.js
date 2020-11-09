const express = require('express');

const projectRouter = require('./data/projects/projectRouter');
const actionRouter = require('./data/actions/actionRouter');

const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'The server is now LIVE!' });
});
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);
module.exports = server;
