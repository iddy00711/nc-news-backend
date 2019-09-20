process.env.NODE_ENV = 'test';
const request = require('supertest');
const chai = require('chai');
const chaiSorted = require('sams-chai-sorted');
const { expect } = chai;
const app = require('../app');
const connection = require('../db/connection');
chai.use(chaiSorted);

describe('/api', () => {
    after(() => {
        connection.destroy();
    });
    beforeEach(() => {
        return connection.seed.run()
    })
    describe('/topics', () => {
        it('GET 200: get response with array of object topics', () => {
            return request(app)
                .get('/api/topics')
                .expect(200)
                .then(({ body }) => {
                    expect(body.topics).to.be.an('array');
                    expect(body.topics[0]).to.contain.keys(
                        'slug',
                        'description'
                    );
                });
        })
    });

    describe('/users/:username', () => {
        it('GET 200: get response with a a user object', () => {
            return request(app)
                .get('/api/users/butter_bridge')
                .expect(200)
                .then(({ body }) => {
                    expect(body.user).to.be.an('object');
                    expect(body.user).to.contain.keys(
                        'username',
                        'avatar_url',
                        'name'
                    );
                });
        })
    });
    describe('/users/:username', () => {
        it('GET 404: returns an err message when given an incorrect end-point', () => {
            return request(app)
                .get('/api/users/not_a_user')
                .expect(404)
                .then(({ body }) => {

                    expect(body.msg).to.equal('path not found');

                });
        })
    });

    describe('/articles/:article_id', () => {
        it('GET: get response with an article object', () => {
            return request(app)
                .get('/api/articles/1')
                .expect(200)
                .then(({ body }) => {
                    expect(body.article).to.be.an('object');
                    expect(body.article).to.contain.keys(
                        'author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count'

                    );
                });
        })
    });
    describe('/articles/:article_id', () => {
        it('GET 404: returns an err message when given an incorrect end-point', () => {
            return request(app)
                .get('/api/articles/1984')
                .expect(404)
                .then(({ body }) => {

                    expect(body.msg).to.equal('path not found')


                });
        })
        it('GET 400: returns an err message bad request', () => {
            return request(app)
                .get('/api/articles/qwertyuiop')
                .expect(400)
                .then(({ body }) => {
                    (body, 'hello 123')

                    expect(body.msg).to.equal('bad request')

                        ;
                });
        })
    })


    describe('/articles/:article_id', () => {
        it('Patch 200: update vote count in article', () => {
            return request(app)
                .patch('/api/articles/1')
                .send({ inc_votes: 1 })
                .expect(200)
                .then(({ body }) => {

                    expect(body.article[0].votes).to.equal(101)

                });
        })
    });
    describe('/articles/:article_id', () => {
        it('Patch 404: repsonds with a 404 when given an inccorect article_id', () => {
            return request(app)
                .patch('/api/articles/10000')
                .send({ inc_votes: 1 })
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).to.equal('path not found')




                });
        });
        it('Patch 400: repsonds with an err message when given a bad request', () => {
            return request(app)
                .patch('/api/articles/qwertyuiop')
                .send({ inc_votes: 1 })
                .expect(400)
                .then(({ body }) => {
                    expect(body.msg).to.equal('bad request')




                });
        });
        it('Patch 400: repsonds with an err message when given a bad request in the patch body', () => {
            return request(app)
                .patch('/api/articles/1')
                .send({ inc_votes: 'qwertyuiop' })
                .expect(400)
                .then(({ body }) => {
                    expect(body.msg).to.equal('bad request')




                });
        });
    });

    describe('/articles/:article_id/comments', () => {
        it('POST 201: add a new comment to an article with a fixed set of keys', () => {
            return request(app)
                .post('/api/articles/1/comments')
                .send({
                    username: 'icellusedkars',
                    body: 'qwertyuiop'
                })
                .expect(201)
                .then(({ body }) => {

                    expect(body.comments).to.contain.keys('author', 'body');
                    expect(body.comments.body).to.equal('qwertyuiop')
                    expect(body.comments.author).to.equal('icellusedkars')
                });
        });
    });

    describe('/articles/:article_id/comments', () => {
        it('POST 404: returns an err message when article id is incorrect in post-request', () => {
            return request(app)
                .post('/api/articles/10000/comments')
                .send({
                    username: 'icellusedkars',
                    body: 'qwertyuiop'
                })
                .expect(404)
                .then(({ body }) => {


                    expect(body.msg).to.equal('path not found');
                });
        });

        it('POST 400: returns an err message when given bad request', () => {
            return request(app)
                .post('/api/articles/qwertyuiop/comments')
                .send({
                    username: 'icellusedkars',
                    body: 'qwertyuiop'
                })
                .expect(400)
                .then(({ body }) => {

                    expect(body.msg).to.equal('bad request');
                });
        });

        it('POST 404: returns an err message when given an incorrect user name', () => {
            return request(app)
                .post('/api/articles/1/comments')
                .send({
                    username: 1234,
                    body: 'qwertyuiop'
                })
                .expect(404)
                .then(({ body }) => {
                    (body)

                    expect(body.msg).to.equal('path not found');
                });
        });
    });
    describe('/articles/:article_id/comments', () => {
        it('GET 200: return an array of comments of a given article', () => {
            return request(app)
                .get('/api/articles/1/comments')
                .expect(200)
                .then(({ body }) => {
                    expect(body.comments).to.be.an('array');
                    expect(body.comments.length).to.equal(13)

                    expect(body.comments.every((comment) => { return comment.article_id === 1 })).to.be.true
                });
        });
    });
    describe('/articles/:article_id/comments', () => {
        it('GET 404: return an error message when given an incorrect end-point', () => {
            return request(app)
                .get('/api/articles/1000/comments')
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).to.equal('path not found')
                });
        });
        it('GET 400 return an error message when given a bad request', () => {
            return request(app)
                .get('/api/articles/qwertyuip/comments')
                .expect(400)
                .then(({ body }) => {
                    expect(body.msg).to.equal('bad request')
                });
        });
    });

    describe('/articles', () => {
        it('GET 200: an `articles` array of article objects', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then(({ body }) => {

                    expect(body.articles).to.be.an('array');

                    expect(body.articles[0]).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');



                });
        });
        it('GET 200: an `articles` array of article', () => {
            return request(app)
                .get('/api/articles?sortBy=votes')
                .expect(200)
                .then(({ body }) => {

                    expect(body.articles).to.be.an('array');
                    expect(body.articles).to.be.descendingBy('votes')
                    expect(body.articles[0]).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');



                });
        });
        it('GET 200: an `articles` array of article', () => {
            return request(app)
                .get('/api/articles?orderBy=asc')
                .expect(200)
                .then(({ body }) => {
                    expect(body.articles).to.be.sortedBy('created_at')

                    expect(body.articles[0]).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');



                });
        });
    });
    describe('/articles', () => {


        it('GET 404: returns an error message when given an incorrect query', () => {
            return request(app)
                .get('/api/articles?sortBy=snoopdogs')
                .expect(404)
                .then(({ body }) => {

                    expect(body.msg).to.equal('path not found');

                });
        });
        it('GET 400: returns an error message when given bad request', () => {
            return request(app)
                .get('/api/articles?orderBy=qwertyuiop')
                .expect(400)
                .then(({ body }) => {



                    expect(body.msg).to.equal('bad request');

                });
        });
    });
    describe('/api/comments/:comment_id', () => {
        it('PATCH 200: return an array of comments of a given article', () => {
            return request(app)
                .patch('/api/comments/2')
                .send({ inc_votes: 1 })
                .expect(200)
                .then(({ body }) => {

                    expect(body.comment.votes).to.equal(15)
                });
        });
        it('PATCH 200: return an array of comments of a given article', () => {
            return request(app)
                .patch('/api/comments/1')
                .send({ inc_votes: 1 })
                .expect(200)
                .then(({ body }) => {

                    expect(body.comment.votes).to.equal(17)
                });
        });

    });
    describe('/api/comments/:comment_id', () => {
        it('PATCH 404: returns an error when given an non-present comment_id', () => {
            return request(app)
                .patch('/api/comments/1000')
                .send({ inc_votes: 1 })
                .expect(404)
                .then(({ body }) => {


                    expect(body.msg).to.equal('path not found')
                });
        });
        it('PATCH 400: returns an error when given a bad request', () => {
            return request(app)
                .patch('/api/comments/qwertyuiop')
                .send({ inc_votes: 1 })
                .expect(400)
                .then(({ body }) => {

                    expect(body.msg).to.equal('bad request')
                });
        });
        it('PATCH 400: returns an error when given a bad request on the patch obj', () => {
            return request(app)
                .patch('/api/comments/qwertyuiop')
                .send({ votes: 1 })
                .expect(400)
                .then(({ body }) => {

                    expect(body.msg).to.equal('bad request')
                });
        });

    });
    describe('/api/comments/:comment_id', () => {
        it('DELETE 204 : deletes comment ', () => {
            return request(app)
                .delete('/api/comments/1')
                .expect(204)

        });

    });
    describe('/api/comments/:comment_id', () => {
        it('DELETE 404 : returns an err message when the comment_id is not present ', () => {

            return request(app)
                .delete('/api/comments/10000')
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).to.equal('comment not found')
                })

        });
        it('DELETE 400 : returns an err message when the comment_id is not in correct type-format ', () => {

            return request(app)
                .delete('/api/comments/qwertyuiop')
                .expect(400)
                .then(({ body }) => {
                    expect(body.msg).to.equal('bad request')
                })

        });

    });
    describe('INVALID METHODS TOPICS', () => {
        it('status 405', () => {

            const invalidMethods = ['patch', 'put', 'delete', 'post'];
            const methodPromises = invalidMethods.map((method) => {
                return request(app)
                [method]('/api/topics')
                    .expect(405)
                    .then(({ body }) => {
                        expect(body.msg).to.equal('method not found')
                    })
            })
            return Promise.all(methodPromises)

        })
    });
    describe('INVALID METHODS USERS', () => {
        it('status 405', () => {

            const invalidMethods = ['patch', 'put', 'delete', 'post'];
            const methodPromises = invalidMethods.map((method) => {
                return request(app)
                [method]('/api/users/1')
                    .expect(405)
                    .then(({ body }) => {
                        expect(body.msg).to.equal('method not found')
                    })
            })
            return Promise.all(methodPromises)

        })
    });
    describe('INVALID METHODS COMMENTS', () => {
        it('status 405', () => {

            const invalidMethods = ['put', 'post'];
            const methodPromises = invalidMethods.map((method) => {
                return request(app)
                [method]('/api/comments/1')
                    .expect(405)
                    .then(({ body }) => {
                        expect(body.msg).to.equal('method not found')
                    })
            })
            return Promise.all(methodPromises)

        })
    });
    describe('INVALID METHODS ARTICLES', () => {
        it('status 405', () => {

            const invalidMethods = ['put', 'delete', 'post', 'patch'];
            const methodPromises = invalidMethods.map((method) => {
                return request(app)
                [method]('/api/articles')
                    .expect(405)
                    .then(({ body }) => {
                        expect(body.msg).to.equal('method not found')
                    })
            })
            return Promise.all(methodPromises)

        })
    });

    describe('INVALID METHODS ARTICLES', () => {
        it('status 405', () => {

            const invalidMethods = ['put', 'delete', 'post'];
            const methodPromises = invalidMethods.map((method) => {
                return request(app)
                [method]('/api/articles/3')
                    .expect(405)
                    .then(({ body }) => {
                        expect(body.msg).to.equal('method not found')
                    })
            })
            return Promise.all(methodPromises)

        })
    });
    describe('INVALID METHODS ARTICLES', () => {
        it('status 405', () => {

            const invalidMethods = ['put', 'delete', 'patch'];
            const methodPromises = invalidMethods.map((method) => {
                return request(app)
                [method]('/api/articles/3/comments')
                    .expect(405)
                    .then(({ body }) => {
                        console.log(body)
                        expect(body.msg).to.equal('method not found')
                    })
            })
            return Promise.all(methodPromises)

        })
    });
})







