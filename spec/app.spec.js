process.env.NODE_ENV = 'test';
const request = require('supertest');
const chai = require('chai');
// const chaiSorted = require('chai-sorted');
const { expect } = chai;
const app = require('../app');
const connection = require('../db/connection');

// chai.use(chaiSorted);

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
    describe.only('/users/:username', () => {
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
                    console.log(body, 'hello 123')
                    // {user: {username: '',...}}
                    expect(body.article).to.be.an('object');
                    expect(body.article).to.contain.keys(
                        'author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count'

                    );
                });
        })
    });
});