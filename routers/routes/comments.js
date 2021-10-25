const express = require('express');

//controllers
const { createNewComment } = require('./../controllers/comments');

//middlewares
const authentication = require('./../middlewares/authentication');

const commentsRouter = express.Router();

commentsRouter.post('/articles/:id/comments', authentication, createNewComment);

module.exports = commentsRouter;
