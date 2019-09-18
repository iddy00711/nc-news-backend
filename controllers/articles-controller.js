const { selectArticle } = require('../models/articles-models')

exports.getArticles = (req, res, next) => {
    const { article_id } = req.params

    selectArticle(article_id)
        .then(([article]) => {

            // console.log(article_id, 'hello 345')

            res.status(200)
                .send({ article })
        }
        ).catch(next)
}


