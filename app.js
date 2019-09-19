const express = require('express')
const app = express()
const apiRouter = require('./routers/api.js')

app.use(express.json())

app.use('/api', apiRouter)


app.use((err, req, res, next) => {
    // console.log(err, 'hello app')
    const errCodes = ['23502', '22P02', '23503']

    if (err.status) {
        res.status(err.status).send({ msg: err.msg })
        console.log(err.msg, 'hello')
    }
    else if (err.code) {
        res.status(err.status).send({ msg: 'yolo' })
    }



    if (errCodes.includes(err.code)) {
        if (err.code === '23502')
            res.status(400).send({ msg: 'Bad Request-Stephen says so it is so it is' })

        else if (err.code === '22P02') {
            res.status(400).send({ msg: 'Incorrect data type ding ding curry curry 2.99' })
        }
        else if (err.code === '23503') {
            res.status(404).send({ msg: err.msg })
        }


    }

    else { console.log(err, 'selectCommss') }



})




module.exports = app; 