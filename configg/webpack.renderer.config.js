const rules = require('./webpack.rules');
const webpack = require("webpack");
const plugins = require('./webpack.plugins');
const alias = require('./webpack.alias');
const log = require('electron-log')
log.transports.file.level = false;
log.transports.console.level = 'debug';
rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
},
{
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
        limit: 10000, // url-loader 包含file-loader，这里不用file-loader, 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
        name: 'static/img/[name].[hash:7].[ext]'
    }
},
{
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
        limit: 10000, // 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
        name: 'static/fonts/[name].[hash:7].[ext]'
    }
}
// ,{
//    test: /\.scss$/,
//   loader:'style!css!sass' 
//   //  loader: ExtractTextPlugin.extract("style", 'css!sass')
//   // 这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'            
// }
,{ test: /\.scss$/, use: [ 
  { loader: "style-loader" },  // to inject the result into the DOM as a style block
  { loader: "css-modules-typescript-loader"},  // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
  { loader: "css-loader", options: { modules: true } },  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
  { loader: "sass-loader" },  // to convert SASS to CSS
  // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
] }
);


module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  // devtool: false,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],  
    alias,
    fallback: { 
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      // "assert": require.resolve("assert/")
      // "assert": false
    },
  }
};
