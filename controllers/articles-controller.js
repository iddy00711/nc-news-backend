const { selectArticle, insertArticle, insertComment, selectComments, selectArtciles_2 } = require('../models/articles-models')

exports.getArticles = (req, res, next) => {
    const { article_id } = req.params

    selectArticle(article_id)
        .then(([article]) => {

            (article_id, 'hello 345')

            res.status(200)
                .send({ article })
        }
        ).catch(next)
}

exports.patchArticles = (req, res, next) => {
    const { inc_votes } = req.body
    const { article_id } = req.params
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
        ('cintroller 123')


    selectComments(article_id, sort_by, order_by).then((comments) => {
        ('con 456')
        res.status(200).send({ comments })
    }).catch(next)

}

exports.getArticles_2 = (req, res, next) => {
    const { sortBy, orderBy, author, topic } = req.query
        (orderBy, 'controller _2')

    selectArtciles_2(sortBy, orderBy, author, topic).then((articles) => {
        res.status(200).send({ articles })
    }).catch(next)
}

