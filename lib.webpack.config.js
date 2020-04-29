const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: '',
    libraryTarget: 'commonjs',
  },
  // optimization: {
  //   minimize: false,
  // },
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, 'src/ui/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // {
      //   test: /\.css$/i,
      //   use: ['style-loader', 'css-loader'],
      // },
    ],
  },
  externals: [
    {
      react: {
        amd: 'react',
        commonjs2: 'react',
        commonjs: 'react',
        root: 'React',
      },
      'react-dom': {
        amd: 'react-dom',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        root: 'ReactDOM',
      },
      'styled-components': {
        amd: 'styled-components',
        commonjs2: 'styled-components',
        commonjs: 'styled-components',
      },
      polished: {
        amd: 'polished',
        commonjs2: 'polished',
        commonjs: 'polished',
      },
    },
    /^@material-ui\/(core|icons)[\/a-zA-Z]*/,
  ],
};
