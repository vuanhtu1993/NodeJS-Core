var english = require('../src/app/greeting/english');

describe('Greeting test', function () {
    describe('Greeting hello', function () {
        it("return Hello", function () {
            english();
            expect().toBe("Hello");
            done();
        })
    })
});