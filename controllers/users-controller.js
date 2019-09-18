const { selectUsers } = require('../models/users-models')

exports.getUsers = (req, res, next) => {
    const { username } = req.params;
    selectUsers(username).then(([user]) => {
        // console.log(username, 'hello 456')
        res.status(200)
            .send({ user })
    }
    ).catch(next)
}

// const arr = [{username:''}]

// const [user] = arr