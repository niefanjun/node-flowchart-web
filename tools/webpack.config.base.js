const path = require('path');
const Ex = require('extract-text-webpack-plugin');

const rules = [{
    test: /\.js$/,
    exclude: [
        path.resolve(__dirname, 'node_modules'),
    ],
    use: {
        loader: 'babel-loader',
    },
}, {
    test: /\.less$/,
    use: Ex.extract({
        fallback: "style-loader",
        use: [{
            loader: 'css-loader',
            options: {
                modules: true,
                camelCase: true,
                importLoaders: 1,
                localIdentName: '[local]',
            },
        }, {
            loader: 'postcss-loader',
            options: {
                config: {
                    path: path.resolve(__dirname, './postcss.config.js'),
                },
            },
        }, {
            loader: 'less-loader',
        }]
    })
}];

const externals = {
    react: {
        root: 'React',
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
    },
};

const plugins = [new Ex("styles.css")];

module.exports = {
    module: {
        rules,
    },
    externals,
    plugins
};