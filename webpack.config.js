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
        test:/\.css$/,
        use:[
          {
            loader:"style-loader"
          },
          {
            loader:"css-loader"
          }
        ]
      },
      {
        test: /\.less$/,
        use: [{
            loader: 'style-loader' // creates style nodes from JS strings
        },
        {
            loader: 'css-loader' // translates CSS into CommonJ
        },
        {
            loader: 'less-loader', // compiles Less to CSS
            options: {
                javascriptEnabled: true
            }
        }]
      },
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
