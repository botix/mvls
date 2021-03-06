const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "src", "public", "js", "main.js"),
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "bundle.js"
    },

    plugins:[
      new HtmlWebpackPlugin({
        template: "./index.html"
      }),
    ],

    module: {
      rules:[
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
            presets:["@babel/preset-react"]
          }
        },
        {
          test:/\.css$/,
          use:[
            "style-loader", 
            "css-loader"
          ]
        }
      ]
    },
    //devtool: "source-map",
}



