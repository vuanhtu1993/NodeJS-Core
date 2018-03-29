# Testing NodeJS app with mocha framework


## 1. Set up environment
```
yarn add mocha --dev
```
- Consider some example below <br>
    Utils.js
    ```
    var add = (a, b) => {
        return a + b;
    };

    module.exports = {
        add,
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
