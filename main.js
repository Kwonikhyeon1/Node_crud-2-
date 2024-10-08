let http = require('http');
let url = require('url');
let topic = require('./lib/topic');
let author = require('./lib/author');

let app = http.createServer(function(request, response) {

    let _url = request.url;                         // url(ex. /?id=HTML)
    let pathname = url.parse(_url, true).pathname;  // url's command(ex. /)
    let queryData = url.parse(_url, true).query;    // url's query-string(ex. {id: HTML})

    if (pathname === '/') { // /, [/?id=HTML, /?id=CSS, /?id=JavaScript]

        if (queryData.id === undefined) {
            topic.home(request, response);
            
        } else {
            topic.page(request, response);

        }        

    } else if (pathname === '/create') {
        topic.create(request, response);

    } else if (pathname === '/create_process') {
        topic.create_process(request, response);

    } else if (pathname === '/update') {  // /?id=HTML, /?id=CSS, /?id=Ruby, ....  , ?id=1, /?id=2, /?id=3, ....
        topic.update(request, response);

    } else if (pathname === '/update_process') {
        topic.update_process(request, response);

    } else if (pathname === '/delete_process') {
        topic.delete_process(request, response);

    } else if (pathname === '/author') {
        author.home(request, response);

    } else if (pathname === '/author/create_process') {
        author.create_process(request, response);

    } else if (pathname === '/author/update') {
        author.update(request, response);

    } else if(pathname === '/author/update_process') {
        author.update_process(request, response);

    } else if (pathname === '/author/delete_process') {
        author.delete_process(request, response);

    } else {

        response.writeHead(404);
        response.end('NOT FOUND');

    }

});

app.listen(3000); 