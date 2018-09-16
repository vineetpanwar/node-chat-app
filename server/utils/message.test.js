var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage',() => {
  it('should generate correct message object',(done) => {
    var res = generateMessage('vineet','hello how are you');
    expect(res.from).toBe('vineet');
    expect(res.text).toBe('hello how are you');
    expect(res.createdAt).toBeA('number');
    //expect(res).toInclude({from,text});

    done();
  });
});
