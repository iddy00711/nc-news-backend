const articlesRouter = require('express').Router();
const {
    getArticles, patchArticles, postComment, getComments, getArticles_2

} = require('../controllers/articles-controller');

articlesRouter
    .route('/:article_id')
    .get(getArticles)
    .patch(patchArticles)


articlesRouter
    .route('/:article_id/comments')
    .post(postComment)
    .get(getComments)

articlesRouter
    .route('/')
    .get(getArticles_2)

module.exports = articlesRouter;