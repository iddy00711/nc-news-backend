const articlesRouter = require('express').Router();
const {
    getArticles, patchArticles, postComment, getComments, getArticles_2

} = require('../controllers/articles-controller');


const send405Error = (req, res, next) => {
    res.status(405).send({ msg: 'method not found' })
}

articlesRouter
    .route('/:article_id')
    .get(getArticles)
    .patch(patchArticles)
    .all(send405Error)


articlesRouter
    .route('/:article_id/comments')
    .post(postComment)
    .get(getComments)
    .all(send405Error)

articlesRouter
    .route('/')
    .get(getArticles_2)
    .all(send405Error)

module.exports = articlesRouter;