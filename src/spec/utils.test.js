const utils = require('../app/utils');

it('it should return right sum', function () {
    let sum = utils.add(10, 20);
    if (sum !== 40) {
        throw new Error(`Expected 30 but get ${sum}`);
    }
});