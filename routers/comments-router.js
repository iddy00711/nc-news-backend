const commentsRouter = require('express').Router();
const {
    patchComments, deleteComment

} = require('../controllers/comments-controller');

commentsRouter
    .route('/:comment_id')
    .delete(deleteComment)
    .patch(patchComments);

module.exports = commentsRouter;