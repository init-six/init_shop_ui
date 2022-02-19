const path =require('path');

module.exports={
  entry: {
    web: ['whatwg-fetch', '@babel/polyfill', path.resolve(__dirname, 'src/index')],
  },

  output:{
    path:path.join(__dirname,'/dist'),
    filename:'index.bundle.js',
  },

  module:{
    rules:[
      {
        test: /\.(j|t)s[x]?$/,
        exclude:/node_modules/,
        use:{
          loader:'babel-loader'
        }
      },
      {
        test:/\.scss$/,
        use:[
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  devServer: {
    port:3000,
    historyApiFallback: {
        index: '/index.html'
    }
  },

  devtool: "source-map"
};
