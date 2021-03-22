const express = require("express");
const app = express();
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const compiler = webpack(webpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
  })
);

app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(3000);
