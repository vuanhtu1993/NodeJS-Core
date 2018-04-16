
# NodeJS
### NodeJs là gì:
* Là JavaScript runtime được viết dựa trên engine V8, giúp cho code JS
có thể chạy được ở phía server (tức là môi trường của hệ điều hành như Mac, Window, Linux)
đóng vai trờ như Apache hay Nginx để tạo Web server
* 5 bước để tạo một web server như sau:
1. tạo file package.json
2. Install webpack (yarn add --dev webpack)
3. Create file webpack.config.js
```
module.exports = {
    entry: ['./src/app/index.js'],
    output: {
        path: __dirname + '/src/build/',
        filename: 'bundle.js',
    }
};
```
4. yarn add babel-core babel-loader webpack-dev-server babel-preset-es2015 babel-polyfill --dev
5. Config parameter webpack.config.js
```
module.exports = {
    entry: ['./src/app/index.js'],
    output: {
        path: __dirname + '/src/build/',
        filename: 'bundle.js',
    },
    module: {
        // loaders: [] will be occured error unknown property
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_module/,
                enforce: 'pre',
            }
        ]
    },
    devServer: {
        port: 3000,
        contentBase: './src/build',
        inline: true,
    }
};
```
6. Config in package.json
```
 "scripts": {
    "build": "webpack",
    // instead of webpack we use webpack-dev-server
    "start": "webpack-dev-server"
  },
  "babel": {
    "presets": ["es2015"]
  },
```

### 3. DevTools
#### Babel (là một transpiler)
1. Gồm có Babel cli, babel là các babel runner
```
   yarn babel folder/file -d folder/file
 ```
   2. babel preset là các preset mà babel flow theo
   ```
    - Đươc khai báo ở bên trong .babelrc hoặc package.json
```
   3. babel loader và babel-core
   
#### Webpack
1.
#### ESlint (Syntax, coding convention)
1. tạo file --init (buộc phải có file này)
2. Chạy file tại folder chứa file .eslintrc
```
yarn eslint folder/file.js
```
#### Prettier
1. Cài trong project ko cần config nhưng mặc định chạy từ file ngoài cùng chứa package.json
```
yarn prettier "src/**/*.js"
script
"prettier": "prettier --write --tab-width 4 \"src/**/*.js\"",
```

### 2. Module trong nodeJs (hiểu đơn giản module là một file)
```
Module có thể hiểu đơn giản như là một file, trong đó có các hàm cũng
như biến được export ra bên ngoài cho các file khác sử dụng

// khai báo trong file rectangle.js
module.export = {
    circumference: (weight, height) => { (weight + height)*2 },
    area: (weight, height) => { weight*height }
}

sử dụng ở một file khác index.js
const rectangle = required('/Shape/rectangle');
rectangle.area(10, 20);
rectangle.circumference(5, 10);
```
### 3. HTTP Module:
 - Là một module quan trong cho
 
 
### 4. FS module:
- fs module provide APIs để tương tác với file theo chuẩn phương POSIX

### 5. MySQL
```javascript
    var mysql = require('mysql');
    
    app.use('/', function(req, res, next) {
       const con = mysql.createConnection({
       host: "localhost",
       user: "test",
       password: "test",
       database: "addressbook"
       });
       con.query('query statement', function(rows) {
           if (err) throw err;
           console.log(rows);
       });
       next();
    });
```
 

