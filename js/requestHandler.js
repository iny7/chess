var exec = require('child_process').exec;
var querystring = require('querystring');
var fs = require('fs')
var formidable = require('formidable')

function start(response){
	// function sleep(Milliseconds){
	// 	var startTime = new Date().getTime();
	// 	while(new Date().getTime() - startTime < Milliseconds);
	// }
	// sleep(5000);
	var body = '<html>'+  
    '<head>'+  
    '<meta http-equiv="Content-Type" '+  
    'content="text/html; charset=UTF-8" />'+  
    '</head>'+  
    '<body>'+  
    '<form action="/upload" enctype="multipart/form-data" '+  
    'method="post">'+  
    '<input type="file" name="upload">'+  
    '<input type="submit" value="Upload file" />'+  
    '</form>'+  
    '</body>'+  
    '</html>';

    response.writeHead('200', {'Content-Type' : 'text/html'});
    response.write(body); 
    response.end();

	// exec('find /',
	// 	{timeout : 10000, maxBuffer : 20000*1024}, 
	// 	function(err, stdout, stderr){
	// 		response.writeHead('200', {'Content-Type' : 'text/html'});
	// 		response.write(stdout);
	// 		response.end();
	// 	})
}

function upload(response, request){
	var form = new formidable.IncomingForm();
	form.uploadDir = 'tmp';
	form.parse(request, function(err, fields, files){
		fs.renameSync(files.upload.path, './tmp/test.pdf')
		response.writeHead('200', {'Content-Type' : 'text/html'});
		response.write("received");
		response.write('<img src="/show">');
		response.end();
	})
	
}

function show(response){
	fs.readFile('img/mm6.jpg', function(err, file){
		console.log(file)
		if(err){
			response.writeHead('500', {'Content-Type' : 'text/plain'})
			response.write('error'+ '\n');
			response.end();
		}else{
			response.writeHead('200', {'Content-Type' : 'image/jpg'});
			response.write(file);
			response.end();
		}
	})
}

exports.start = start;
exports.upload = upload;
exports.show = show;