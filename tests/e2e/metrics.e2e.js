const {describe}  =  require("mocha");
var expect = require('chai').expect;
var request = require('axios');
const {server, port} = require('../../bin/www');
const host= `http://localhost:${port}`;
describe('Test Metric Logging', async function() {
  before('start server', (done)=>{
    start = server;
    server.on('request', ()=>{

    });
    done();
  });
  after('close server', (done)=> {
    server.close();
    done();
  });

  it('should return sum and average when metric is not present in storage', async function () {
    const res = await request.get(`${host}/metric/anotherTest/sum`).catch(err => err.response);
    expect(res).to.be.an('object');
    expect(res.status).to.equal(200);
    expect(res.data).to.deep.equal({value: 0});
  });

  it('should add a metric to the storage', async function () {
    const res = await request.post(`${host}/metric/test`, {value: 100});
    expect(res).to.be.an('object');
  });

  it('should return sum and average when metric is present in storage', async function () {
    const res = await request.get(`${host}/metric/test/sum`).catch(err => err.response);
    expect(res).to.be.an('object');
    expect(res.status).to.equal(200);
    expect(res.data).to.deep.equal({value: 100});
  });

  it('should throw error if value is not provided', async function () {
    const res = await request.post(`${host}/metric/anotherTest`, {}).catch(err => err.response);
    expect(res).to.be.an('object');
    expect(res.status).to.equal(400);
    expect(res.data.err.message).to.equal('Please provide a value in body');
  });

  it('should throw error if value is not a number', async function () {
    const res = await request.post(`${host}/metric/anotherTest`, {value: 'string'}).catch(err => err.response);
    expect(res).to.be.an('object');
    expect(res.status).to.equal(400);
    expect(res.data.err.message).to.equal('Value can only be a number')
  });

  it('should throw error if value is out of bounds', async function () {
    const res = await request.post(`${host}/metric/anotherTest`, {value: 4004040404040404999448474722388455933}).catch(err => err.response);
    expect(res).to.be.an('object');
    expect(res.status).to.equal(400);
    expect(res.data.err.message).to.equal(`Please provide a value less than ${Number.MIN_SAFE_INTEGER} and greater than ${Number.MIN_SAFE_INTEGER}`);
  });

});
