const { selectComments } = require('../models/comments-models')

exports.getComments = (req, res, next) => {
    selectComments().then((comment) =>
        res.status(200)
            .send(comment)
    )
}

