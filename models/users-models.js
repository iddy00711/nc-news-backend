const connection = require('../db/connection');

exports.selectUsers = (username) => {
    // console.log(username, "hello 789")
    return connection
        .select('*')
        .from('users')
        .where('username', username)
        .then(response => {

            if (response.length === 0) {
                return Promise.reject({ status: 404, msg: "user not found" });
            }
            else { return response }
        })



}

// exports.selectUser = (username) => {
//     // console.log(username, "hello 789")
//     return connection
//         .select('*')
//         .from('users')
//         .where('username', username)
//         .then(response => {
//             console.log(response)
//             if (response.length === 0) {
//                 return Promise.reject({ status: 404, msg: "user not found" });
//             }
//             else { return response }
//         })



