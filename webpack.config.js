module.exports = {
    entry: ['./src/app/test.js'],
    output: {
        path: __dirname + '/src/build/',
        filename: 'bundle.js',
    },
    module: {
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