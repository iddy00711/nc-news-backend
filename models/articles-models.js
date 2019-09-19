const connection = require('../db/connection')

exports.selectArticle = (article_id) => {
    {
        return connection
            .select('articles.*')
            .from('articles')
            .leftJoin('comments', 'articles.article_id', 'comments.article_id')
            .groupBy('articles.article_id')
            .count('comment_id AS comment_count')

    }
}

exports.insertArticle = (newVote, id) => {

    console.log(newVote, id, 'hello 123')

    return connection
        .from('articles')
        .where({ "article_id": id })
        .increment({ "votes": newVote })
        .returning('*')
        .then(response => {

            if (response.length === 0) {
                return Promise.reject({ status: 404, msg: "user not found" });
            }
            else { return response }
        })

}

exports.insertComment = (comment, article_id) => {

    const obj = { article_id, author: comment.username, votes: comment.votes, created_at: new Date(Date.now()), body: comment.body }

    return connection
        .insert(obj)
        .into('comments')
        .where({ article_id })
        .returning('*')
        .then((newComment) => {

            return newComment[0];
        })
};

exports.selectComments = (article_id, sort_by, order_by) => {
    console.log('models 123')


    return connection.select('*').from('comments').where({ 'article_id': article_id }).sortBy(sort_by, order_by).then(response => {
        console.log('models 456')

        if (response.length === 0) {
            return Promise.reject({ status: 404, msg: "user not found" });
        }
        else { return response }
    })
}