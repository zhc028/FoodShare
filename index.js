const express = require('express')
const app = express()
const port = 3000
var path = require('path');

app.use('/images', express.static(__dirname + "/images"));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/foods.html', (req, res) => {
  res.sendFile(path.join(__dirname + '/foods.html'));
})

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "style.css");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
