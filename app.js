const fs = require('fs');
const path = require('path');
const express = require('express');
const chalk = require('chalk')
const compression = require('compression');
var CACHETIME = 60 * 1000 * 60 * 24 * 30;

const app = express();
app.use(compression());
app.use(express.static(path.resolve(__dirname, './build'), { maxAge: CACHETIME }))

app.get('*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, './build/index.html'), 'utf-8')
    console.log(html, '---')
    res.send(html)
})
app.listen(3016, res => {
  console.log(chalk.yellow('Start Service On 3016'));
});
