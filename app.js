const express = require('express')
const app = express()
const apiRouter = require('./routers/api.js')

app.use(express.json())

app.use('/api', apiRouter)


app.use((err, req, res, next) => {
    const errCodes = ['23502', '22P02', '23503', '42703', '42702']

    if (errCodes.includes(err.code)) {
        if (err.code === '23502')
            res.status(400).send({ msg: 'Bad Request-Stephen says so it is so it is' })

        else if (err.code === '22P02') {
            res.status(400).send({ msg: 'bad request' })
        }
        else if (err.code === '23503') {
            res.status(404).send({ msg: 'path not found' })
        }
        else if (err.code === '42703') {
            ('[hello nap')
            res.status(404).send({ msg: 'path not found' })
        }
        else if (err.code === '42702') {
            ('[hello nap')
            res.status(404).send({ msg: 'path not found' })
        }
    }

    if (err.status) {
        res.status(err.status).send({ msg: err.msg })
    }
    else {
        res.status(500).send({ msg: 'server error' })
    }




})
//

/* exports.handleSqlErrors = err, req, res, next) => {next(err)}

exports.handleCustomeErrors = (err, req, res, next) => {
    if
}
 */




module.exports = app; 