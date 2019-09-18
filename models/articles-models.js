const connection = require('../db/connection')

exports.selectArticle = (article_id) => {
    if (article_id !== ) {
        // console.log(article_id, 'hello 123')
        return connection
            .select('articles.*')
            .from('articles')
            .leftJoin('comments', 'articles.article_id', 'comments.article_id')
            .groupBy('articles.article_id')
            .count('comment_id AS comment_count')

    }
}