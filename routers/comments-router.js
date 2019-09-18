const commentsRouter = require('express').Router();
const {
    getComments

} = require('../controllers/comments-controller');

commentsRouter
    .route('/')
// .delete(getComments)
// .patch(postComments);

module.exports = commentsRouter;