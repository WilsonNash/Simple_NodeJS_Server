const http = require("http"),
      fs = require("fs"),
      path = require("path");

const hostname = '00.0.0.00'; //insert your IP address here
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
		fs.readFile("./public/index.html", "UTF-8", function(err, html) {
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(html);
		});

	} else if (req.url.match(/.css$/)) {

		var cssPath = path.join(__dirname, 'public', req.url);
		var fileStream = fs.createReadStream(cssPath, "UTF-8");

		res.writeHead(200, {"Content-Type": "text/css"});

		fileStream.pipe(res);

	} else if (req.url.match(/.jpg$/)) {

		var imgPath = path.join(__dirname, 'public', req.url);
		var imgStream = fs.createReadStream(imgPath);

		res.writeHead(200, {"Content-Type": "image/jpeg"});

		imgStream.pipe(res);

	} else if (req.url.match(/.png$/)) {

		var pngPath = path.join(__dirname, 'public', req.url);
		var pngStream = fs.createReadStream(pngPath);

		res.writeHead(200, {"Content-Type": "image/png"});

		pngStream.pipe(res);

	} else if (req.url.match(/.js$/)) {

		var jsPath = path.join(__dirname, 'public', req.url);
		var jsStream = fs.createReadStream(jsPath, "UTF-8");

		res.writeHead(200, {"Content-Type": "application/js"});

		jsStream.pipe(res);

	} else {
		res.writeHead(404, {"Content-Type": "text/plain"});
		res.end("404 File Not Found");
	}

  var newImgPath = path.join(__dirname, 'public', req.url);

  // extract filename from the header
  var filename = req.headers['x-filename']

  // streamed file
  var file = fs.createWriteStream(`public/_images/${filename}`);

  // pipe request stream to file
  req.pipe(file);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
