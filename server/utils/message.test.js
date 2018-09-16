var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

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

describe('generateLocationMessage',() => {
  it('should generate correct location object',(done) => {
    var res = generateLocationMessage('vineet',1,1);
    expect(res.from).toBe('vineet');
    expect(res.url).toBe('https://www.google.com/maps?q=1,1');
    expect(res.createdAt).toBeA('number');
    done();
  });
});
