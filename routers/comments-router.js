const commentsRouter = require('express').Router();
const {
    patchComments, deleteComment
} = require('../controllers/comments-controller');

const send405Error = (req, res, next) => {
    res.status(405).send({ msg: 'method not found' })
}

commentsRouter
    .route('/:comment_id')
    .delete(deleteComment)
    .patch(patchComments)
    .all(send405Error)


module.exports = commentsRouter;