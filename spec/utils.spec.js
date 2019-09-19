const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('returns an empty array, when given an empty array', () => {
    const inputArr = [];
    const actual = formatDates(inputArr);

    expect(actual).to.be.an('array')
  })
  it('returns a new array with a key containing a timestamp obj, when given an array with a single ele-obj', () => {
    const inputArr = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }];
    const actual = formatDates(inputArr)


    const dataArr = new Date(inputArr[0].created_at)


    expect(actual[0].created_at).to.deep.equal(new Date(inputArr[0].created_at))

  })
  it('returns a new array with a key containing a timestamp obj, when given an array with more than one ele-obj', () => {
    const inputArr = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    },
    {
      title: 'Sony Vaio; or, The Laptop',
      topic: 'mitch',
      author: 'icellusedkars',
      body:
        'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
      created_at: 1416140514171,
    }];
    const actual = formatDates(inputArr)

    // const dataArr = new Date(inputArr[0].created_at)


    expect(actual[1].created_at).to.deep.equal(new Date(inputArr[1].created_at))





  })
  it('does not mutate original array', () => {
    const inputArr = [{
      title: 'Sony Vaio; or, The Laptop',
      topic: 'mitch',
      author: 'icellusedkars',
      body:
        'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
      created_at: 1416140514171,
    }]
    const inputArrClone = [{
      title: 'Sony Vaio; or, The Laptop',
      topic: 'mitch',
      author: 'icellusedkars',
      body:
        'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
      created_at: 1416140514171,
    }]
    const actual = formatDates(inputArr)

    expect(inputArr).to.deep.equal(inputArrClone)
  })
  it('returned array has all original keys', () => {
    const inputArr = [{
      title: 'Sony Vaio; or, The Laptop',
      topic: 'mitch',
      author: 'icellusedkars',
      body:
        'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
      created_at: 1416140514171,
    }]
    const actual = formatDates(inputArr)


    expect(actual[0]).to.have.all.keys(['title', 'topic', 'author', 'body', 'created_at'])
  })
})



describe('makeRefObj', () => {
  it('returns an empty array, when given an empty array', () => {
    const inputArr = [];
    const actual = makeRefObj(inputArr);

    expect(actual).to.be.an('object')
  })
  it('checks the keys of a refObj (are correct) when given an array of an obj ', () => {
    const inputArr = [{
      article_id: 1,
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }];
    const actual = makeRefObj(inputArr, 'article_id', 'title');


    expect(actual).to.be.have.all.keys('1')
    // console.log(actual)
  })
  it('Returns a refObj when given an array of an obj ', () => {
    const inputArr = [{
      article_id: 1,
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }];
    const actual = makeRefObj(inputArr, 'article_id', 'title');

    expect(actual).to.deep.equal({ 1: 'Living in the shadow of a great man' })

  })
  it('Returns a refObj when given an array of 2 obj ', () => {
    const inputArr = [{
      article_id: 1,
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }, {
      article_id: 2,
      title: 'Living in the qwertyuiop of a g man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514172,
      votes: 10,
    }];
    const actual = makeRefObj(inputArr, 'article_id', 'title');

    expect(actual).to.deep.equal({ 1: 'Living in the shadow of a great man', 2: 'Living in the qwertyuiop of a g man' })

  })
})


describe('formatComments', () => {
  it('returns an empty array, when given an empty array', () => {
    const inputArr = [];
    const actual = formatComments(inputArr);

    expect(actual).to.be.an('object')
  })

  it('Has all the nec. keys in the returned obj', () => {
    const inputArr = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    }]
    const refObj = {
      "They're not exactly dogs, are they?": 16
    }

    const actual = formatComments(inputArr, refObj)
    expect(actual[0]).to.have.all.keys('author', 'article_id', 'body', 'votes', 'created_at')
  })
  it('returns a correct object when given an object and a ref object', () => {
    const inputArr = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    }]
    const refObj = {
      "They're not exactly dogs, are they?": 1
    }

    const actual = formatComments(inputArr, refObj)
    expect(actual[0]).to.deep.equal({
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      article_id: 1,
      author: 'butter_bridge',
      votes: 16,
      created_at: new Date(inputArr[0].created_at)
    })
  })
});
