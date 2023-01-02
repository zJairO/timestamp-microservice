// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// date api endpoint
app.get("/api/:date", (req, res) => {
  let regex = new RegExp(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/);
  let date;
  let unix;
  if (regex.test(req.params.date)) {
    date = new Date(req.params.date).toUTCString();
    unix = Math.floor(Date.parse(date));
  } else {
    unix = req.params.date;
    date = new Date(unix * 1000).toUTCString();
  }

  res.json(
    {
      unix: unix,
      utc: date
    }
  )
});

// listen for requests :)
/*
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});*/
var listener = app.listen(8080, () => {
  console.log('Your app is listening on port '+ listener.address().port);
});
