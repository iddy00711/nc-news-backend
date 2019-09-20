const connection = require('../db/connection');

exports.selectUsers = (username) => {
    return connection
        .select('*')
        .from('users')
        .where('username', username)
        .then(response => {

            if (response.length === 0) {
                return Promise.reject({ status: 404, msg: "path not found" });
            }
            else { return response }
        })
}





