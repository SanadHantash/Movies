const express = require('express');
const app = express();
const http = require('https');

app.set('view engine', 'ejs');

const hostname = '127.0.0.1';
const port = 8000;

app.get('/', (req, res) => {
  res.redirect('/top');
});

app.get("/top",(request,response) => {
  const options = {
    method: 'GET',
    hostname: 'imdb-top-100-movies.p.rapidapi.com',
    port: null,
    path: '/top100movies',
    headers: {
      'X-RapidAPI-Key': 'a8ea4f4727msh96c9781d2471adcp1f3441jsn1a2a795a2945',
      'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
    }
  };

  const req = http.request(options, function (res) {
    const chunks = [];
  
    res.on('data', function (chunk) {
      chunks.push(chunk);
    });
  
    res.on('end', function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
      let data = JSON.parse(body);
      response.render('index.ejs',{movie:data})
    });
  });
  req.end();
});


app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

