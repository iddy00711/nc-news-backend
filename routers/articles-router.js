const articlesRouter = require('express').Router();
const {
    getArticles, patchArticles, postComment, getComments

} = require('../controllers/articles-controller');

articlesRouter
    .route('/:article_id')
    .get(getArticles)
    .patch(patchArticles)


articlesRouter
    .route('/:article_id/comments')
    .post(postComment)
    .get(getComments)

module.exports = articlesRouter;