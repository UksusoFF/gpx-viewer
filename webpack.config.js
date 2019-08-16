const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: './assets/scripts/src',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: [
            //'./node_modules/@types',
            //'./assets/scripts/@types',
            './node_modules/leaflet',
            './node_modules/gpx-parser-builder',
        ],
        plugins: [new TsconfigPathsPlugin()]
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'resources/scripts')
    }
};