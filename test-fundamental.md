# Testing NodeJS app with mocha framework


## 1. Set up environment
```
yarn add mocha --dev
```
- Consider some example below <br>
    Utils.js
    ```
    let add = (a, b) => {
        return a + b;
    };
    let square = (a, b) => {
        let result = 1;
        for (let i = 0; i < b; i++) {
            result = result * a;
        }
        return result;
    };
    console.log(square(2, 3));
    module.exports = {
        add,
        square
    };
    ```
    Utils.test.js
    ```
    const utils = require('../app/utils');

    it('it should return right sum', function () {
        let sum = utils.add(10, 20);
        if (sum !== 30) {
            throw new Error(`Expected 30 but get ${sum}`);
        }
    });
    ```
    Package.json
    ```
     "scripts": {
        "test": "mocha \"./{,!(node_modules)/**/}*.test.js\""
      },
      And then yarn test
    ```
## Watch and auto restart test
### Introduction nodemon
 - to monitor the change of file (instead of node *.js many time
we can use nodemon to monitor the change of file)
    ```
    yarn add nodemon --dev

    #If file take a change execute this command
    nodemon nameFile.js --exec "npm test"
    ```

## Using expect for test
    ```
    yarn add expect --dev
    ```
   - Utils.test.js
   ```
    const utils = require('../app/utils');

    const expect = require('expect');

    it('it should return right sum', function () {
        let sum = utils.add(10, 20);
        expect(sum).toBe(30).toBeA('number');
    });
    it('it should return correct square', function () {
        let res = utils.square(2, 3);
        console.log(res);
        expect(res).toBe(8).toBeA('number');
    });
   ```