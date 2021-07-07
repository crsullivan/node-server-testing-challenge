const db = require('../database/dbConfig.js');
const superTest = require('supertest');
const Quotes = require('./quotes-model.js');
const server = require('../api/server');


const { insert, getAll, remove, update } = require('./quotes-model.js')

describe('getAll()', function() {
    it('should return 200', function() {
        return superTest(server).get('/quotes').then(res => {
            expect(res.status).toBe(200);
        })
    })
    it('should return provided quote', async function() {
        let quote = await insert({ author: 'bill', quote: 'billyyy boyyy'});
        expect(quote.author).toBe('bill');
        expect(quote.id).toBeDefined();

        quote = await insert({ author: "betsy", quote: 'betsyyy girlll' });
        expect(quote.author).toBe('betsy');
        expect(quote.id).toBeDefined();

    });
});


describe('insert()', function() {
    beforeEach(async () => {
        await db('quotes').truncate();
    })
    it('should insert a quote', async function() {
        await insert({author: 'bill', quote: 'billyyy boyyy'});
        const quotes = await db('quotes');
        expect(quotes).toHaveLength(1);
    })
    it('should return provided quote', async function() {
        let quote = await insert({ author: 'bill', quote: 'billyyy boyyy'});
        expect(quote.author).toBe('bill');
        expect(quote.id).toBeDefined();

        quote = await insert({ author: "betsy", quote: 'betsyyy girlll' });
        expect(quote.author).toBe('betsy');
        expect(quote.id).toBeDefined();

    });
});

describe('remove()', function() {
    beforeEach(async () => {
        await db('quotes').truncate();
    })
    it('should remove a quote', async function() {
        await insert({author: 'bill', quote: 'billyyy boyyy'});
        await Quotes.remove(1)
        let nowQuotes = await Quotes.getAll()
        expect(nowQuotes).toHaveLength(0);
    })
    it('should return 200', async function() {
        await insert({author: 'bill', quote: 'billyyy boyyy'});
        return superTest(server).delete('/quotes/1').then(res => {
            expect(res.status).toBe(200);
        })
    })
});

describe('update()', function() {
    beforeEach(async () => {
        await db('quotes').truncate();
    })
    it('should edit a quote', async function() {
        await insert({author: 'bill', quote: 'billyyy boyyy'});
        await Quotes.update(1, {author: 'billy', quote: 'billyyy boyyy'})
        const quotes = await db('quotes');
        expect(quotes[0].author).toBe('billy')
    })
    it('should return a proper id', async function() {
        await insert({author: 'bill', quote: 'billyyy boyyy'});
        await Quotes.update(1, {author: 'billy', quote: 'billyyy boyyy'})
        const quotes = await db('quotes');
        expect(quotes[0].id).toBe(1)
    })
   
});