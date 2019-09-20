const usersRouter = require('express').Router();
const {
    getUsers

} = require('../controllers/users-controller');


const send405Error = (req, res, next) => {
    res.status(405).send({ msg: 'method not found' })
}

usersRouter
    .route('/:username')
    .get(getUsers)
    .all(send405Error)



module.exports = usersRouter;