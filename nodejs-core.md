
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
