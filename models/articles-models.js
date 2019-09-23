const connection = require('../db/connection')

exports.selectArticle = (article_id) => {

    return connection
        .select('articles.*')
        .from('articles')
        .leftJoin('comments', 'articles.article_id', 'comments.article_id')
        .groupBy('articles.article_id')
        .count('comment_id AS comment_count')
        .where({ 'articles.article_id': article_id })
        .then(response => {
            if (response.length === 0) {
                return Promise.reject({ status: 404, msg: "path not found" });
            }
            else { return response }
        })

}

exports.insertArticle = (newVote, id) => {

    (newVote, id, 'hello 123')

    return connection
        .from('articles')
        .where({ "article_id": id })
        .increment({ "votes": newVote })
        .returning('*')
        .then(response => {
            if (response.length === 0) {
                return Promise.reject({ status: 404, msg: "path not found" });
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

exports.selectComments = (article_id, sort_by = 'created_at', order_by = 'desc') => {



    return connection
        .select('*')
        .from('comments')
        .where({ 'article_id': article_id })
        .orderBy(sort_by, order_by)
        .then(response => {
            if (response.length === 0) {
                return Promise.reject({ status: 404, msg: "path not found" });
            }
            else { return response }
        })
}

exports.selectArtciles_2 = (sortBy = 'created_at', orderBy = 'desc', author, topic) => {
    if (!['asc', 'desc'].includes(orderBy)) { return Promise.reject({ status: 400, msg: "bad request" }) }


    return connection
        .select('articles.*')
        .from('articles')
        .leftJoin('comments', 'articles.article_id', 'comments.article_id')
        .groupBy('articles.article_id')
        .count('comment_id AS comment_count')
        .orderBy(sortBy, orderBy)
        .modify(currentQuery => {
            if (author) { currentQuery.where({ 'articles.author': author }) }
            if (topic) { currentQuery.where({ 'articles.topic': topic }) }
        })
        .then(items => {


            return Promise.all([items, checkThingExists('articles.author', author), checkThingExists('articles.topic', topic)])

        })
        .then(([response]) => {
            console.log('2nd then block')
            console.log(typeof response)

            if (response.length === 0) {
                return Promise.reject({ status: 404, msg: "path not found" });
            }
            else { return response }
        })

}

const checkThingExists = (column, query) => {

    if (!query) { return false }
    else {

        return connection
            .first('*')
            .from('articles')
            .where({ [column]: query })
            .then(arts => {
                console.log(arts, 'then')
                if (!arts) { console.log('if'); return Promise.reject({ status: 404, msg: 'path not found' }) }

                else { console.log('else'); return true }
            })
    }
}


//exports.updateComment = (commentId, newVote) => {return connection('comments').where({'comment_id': comment_id}).increment('votes':newVotes).returning('*')}
