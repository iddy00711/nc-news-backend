const connection = require('../db/connection');

exports.selectUsers = (username) => {
    // console.log(username, "hello 789")
    return connection
        .select('*')
        .from('users').then(response => {
            if (response.length === 0) {
                return Promise.reject({ status: 404, msg: "route not found" });
            }
        }
        )
        else { return reponse }

}