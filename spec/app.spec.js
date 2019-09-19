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
        it('GET: get response with array of object topics', () => {
            return request(app)
                .get('/api/topics')
                .expect(200)
                .then(({ body }) => {
                    // console.log(body)
                    expect(body.topics).to.be.an('array');
                    expect(body.topics[0]).to.contain.keys(
                        'slug',
                        'description'
                    );


                });
        })
    });

    describe('/users/:username', () => {
        it('GET: get response with a a user object', () => {
            return request(app)
                .get('/api/users/tickle122')
                .expect(200)
                .then(({ body }) => {
                    // console.log(body, 'hello 123')
                    // {user: {username: '',...}}
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
        it('GET 404: returns a 404 error when non-user inputted', () => {
            return request(app)
                .get('/api/users/not_a_user')
                .expect(404)
                .then(({ body }) => {

                    expect(body.msg).to.equal('Incorrect user name');

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
    // describe('/articles/:article_id', () => {
    //     it('GET 404: get response with an article object', () => {
    //         return request(app)
    //             .get('/api/articles/1')
    //             .expect(200)
    //             .then(({ body }) => {
    //                 console.log(body, 'hello 123')
    //                 // {user: {username: '',...}}
    //                 expect(body.article).to.be.an('object');
    //                 expect(body.article).to.contain.keys(
    //                     'author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count'

    //                 );
    //             });
    //     })
    // });
    // describe('/articles/:article_id', () => {
    //     it('GET 400: get response with an article object', () => {
    //         return request(app)
    //             .get('/api/articles/1')
    //             .expect(200)
    //             .then(({ body }) => {
    //                 console.log(body, 'hello 123')
    //                 // {user: {username: '',...}}
    //                 expect(body.article).to.be.an('object');
    //                 expect(body.article).to.contain.keys(
    //                     'author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count'

    //                 );
    //             });
    //     })
    // });

    describe('/articles/:article_id', () => {
        it('Patch 200: update vote count in article', () => {
            return request(app)
                .patch('/api/articles/1')
                .send({ inc_votes: 1 })
                .expect(200)
                .then(({ body }) => {
                    // console.log(body, 'hello 123')
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
                    // console.log(body, 'hello 123')
                    expect(body.msg).to.equal('user not found')




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
                    console.log(body.comments, 'app.sec')
                    expect(body.comments).to.contain.keys('author', 'body');
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

                    expect(body.msg).to.equal('user not found');
                });
        });
    });
    describe('/articles/:article_id/comments', () => {
        it('GET 200: return an array of comments of a given article', () => {
            return request(app)
                .get('/api/articles/1/comments')
                .expect(200)
                .then(({ body }) => {
                    console.log(body.comments[0])
                    expect(body.comments).to.be.an('array');
                    expect(body.comments.length).to.equal(13)

                    expect(body.comments.every((comment) => { return comment.article_id === 1 })).to.be.true
                });
        });
    });

    describe('/articles', () => {
        it('GET 200: an `articles` array of article objects', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then(({ body }) => {

                    expect(body.articles).to.be.an('object');

                    expect(body.articles).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');



                });
        });
        it('GET 200: an `articles` array of article', () => {
            return request(app)
                .get('/api/articles?sortBy=votes')
                .expect(200)
                .then(({ body }) => {
                    console.log(body.articles)

                    expect(body.articles).to.be.an('array');
                    expect(body.articles).to.be.descendingBy('votes')
                    // expect(body.articles[])

                    expect(body.articles[0]).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');



                });
        });
        it('GET 200: an `articles` array of article', () => {
            return request(app)
                .get('/api/articles?orderBy=asc')
                .expect(200)
                .then(({ body }) => {
                    console.log(body.articles)


                    expect(body.articles).to.be.sortedBy('created_at')

                    expect(body.articles[0]).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');



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

    });
    describe.only('/api/comments/:comment_id', () => {
        it('PATCH 404: returns an error when given an non-present comment_id', () => {
            return request(app)
                .patch('/api/comments/1000')
                .send({ inc_votes: 1 })
                .expect(404)
                .then(({ body }) => {
                    console.log(body, 'shaqqlqlqlq')

                    expect(body.msg).to.equal('comment not found')
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
})







