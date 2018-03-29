const utils = require('../app/utils');

const expect = require('expect');

it('it should return right sum', function () {
    let sum = utils.add(10, 20);
    // if (sum !== 30) {
    //     throw new Error(`Expected 30 but get ${sum}`);
    // }
    expect(sum).toBe(30).toBeA('number');
});
it('it should return correct square', function () {
    let res = utils.square(2, 3);
    console.log(res);
    // if (sum !== 30) {
    //     throw new Error(`Expected 30 but get ${sum}`);
    // }
    expect(res).toBe(8).toBeA('number');
});
it('add name for user', () => {
   let user = {};
   let fullName = 'Vu AnhTus';
   utils.setName(user, fullName);
   expect(user).toInclude({firstName: 'Vu'});
});