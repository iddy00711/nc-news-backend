const express = require('express')
const app = express()
const apiRouter = require('express').Router()
const articlesRouter = require('./articles-router.js')
const commentsRouter = require('./comments-router.js')
const topicsRouter = require('./topics-router.js')
const usersRouter = require('./users-router.js')

apiRouter.use('/articles', articlesRouter)
apiRouter.use('/comments', commentsRouter)
apiRouter.use('/topics', topicsRouter)
apiRouter.use('/users', usersRouter)

//.all(req, res) =>{ res.status(405).send({msg:'not found})}
//const invalidMathods = ['patch','put', 'post', 'delete']
//invalidRequestsPromises.map(method => {return request(app) [method]('/api/houses').expect(405)}) return Promise.all(invalidResponsePromiss)




module.exports = apiRouter