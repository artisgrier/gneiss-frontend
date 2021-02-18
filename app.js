const express = require('express');
const path = require('path');

const app = express();



app.use(express.static(path.join(__dirname + '/dist/gniess')));

app.all('*', (req, res)=>{
  res.sendFile('index.html', {root:path.join(__dirname + '/dist/gniess')});
});

app.listen(3000, ()=>{
  console.log('Server is up and listening on port 3000');
});
