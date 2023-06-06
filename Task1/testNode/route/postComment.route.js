const express = require('express');
const { postComment } = require('../controller/postComment.controller');
const { validateRequest } = require('../utils/verifySignature');

const postCommentRoute = express.Router();

postCommentRoute.post('/webhook',validateRequest ,postComment);