const { selectArticle, insertArticle, insertComment, selectComments } = require('../models/articles-models')

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

exports.patchArticles = (req, res, next) => {
    const { inc_votes } = req.body
    const { article_id } = req.params
    // console.log(inc_votes, article_id, 'hello 456')
    insertArticle(inc_votes, article_id)
        .then((article) => {
            res.status(200).send({ article })

        }).catch(next)
}

exports.postComment = (req, res, next) => {


    const { article_id } = req.params

    insertComment(req.body, article_id).then((newComment) => {
        res.status(201).send({ comments: newComment });
    }
    ).catch(next)
}

exports.getComments = (req, res, next) => {
    const { article_id } = req.params
    const { sort_by, order_by } = req.query
    console.log('cintroller 123')


    selectComments(article_id, sort_by, order_by).then((comments) => {
        console.log('con 456')
        res.status(200).send({ comments })
    }).catch(console.log)

}


// const { sort_by, order_by, author, topic } = req.query

