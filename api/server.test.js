const superTest = require('supertest');
const server = require('./server');

it('should set db env to testing', function() {
    expect(process.env.DB_ENV).toBe("testing");
})

describe('server', function() {
    describe('GET/', function() {
        it('should return 200', function() {
            return superTest(server).get('/').then(res => {
                expect(res.status).toBe(200);
            })
        })
        it('should return JSON formatted res', function() {
            return superTest(server).get('/').then(res => {
                expect(res.type).toMatch(/json/i);
            })
        })
    })
}) 