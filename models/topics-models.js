const connection = require('../db/connection');


exports.selectTopics = () => {

    return connection
        .select('*')
        .from('topics')
        .then(response => {


            if (response.length === 0) {
                return Promise.reject({ status: 404, msg: "user not found" });
            }
            else { return response }
        })
}