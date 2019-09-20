const { updateComments, destoryComment } = require('../models/comments-models')

exports.patchComments = (req, res, next) => {
    ('hello controller')
    const { inc_votes } = req.body
    const { comment_id } = req.params


    updateComments(comment_id, inc_votes)
        .then(([comment]) => {
            res.status(200).send({ comment })

        }).catch(next)
}

exports.deleteComment = (req, res, next) => {
    const { comment_id } = req.params

    destoryComment(comment_id).then(() => {
        res.sendStatus(204)
    }).catch(next)

}



