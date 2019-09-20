const topicsRouter = require('express').Router();
const {
    getTopics,

} = require('../controllers/topics-controller');


const send405Error = (req, res, next) => {
    res.status(405).send({ msg: 'method not found' })
}
topicsRouter
    .route('/')
    .get(getTopics)
    .all(send405Error)





module.exports = topicsRouter;