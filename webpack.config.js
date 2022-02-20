const path =require('path');

module.exports={
  entry: {
    web: ['whatwg-fetch', '@babel/polyfill', path.resolve(__dirname, 'src/index')],
  },

  output:{
    path:path.join(__dirname,'/dist'),
    filename:'index.bundle.js',
  },

  resolve: {
    extensions: ['.js', '.tsx', '.jsx']
  },

  module:{
    rules:[
      {
        test: /\.(j|t)s[x]?$/,
        exclude:/node_modules/,
        include:path.resolve('src'),
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
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.less$/i,
        use: [
          {
              loader: 'style-loader',
          },
          {
              loader: 'css-loader',
          },
          {
              loader: 'less-loader', // compiles Less to CSS
              options: {
                lessOptions: { 
                  modifyVars: { 
                    'primary-color': '#1DA57A',
                    'link-color': '#1DA57A',
                  },
                  javascriptEnabled: true,
               },
              },
          },
        ],
      },
    ],
  },

  devServer: {
    port:3000,
    historyApiFallback: {
        index: '/index.html'
    }
  },
};
