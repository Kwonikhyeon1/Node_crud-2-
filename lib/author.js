let template = require('./template.js');
let db = require('./db.js');
let qs = require('querystring');
let url = require('url');

exports.home = function(request, response) {
    console.log('[author] home()');

    db.query('SELECT * FROM TOPIC', function(error, topics) {
        
        db.query('SELECT * FROM AUTHOR', function(error, authors) {

            // 홈
            let title = 'Welcome';
            let _description = 'Hello, Node.js';

            let list = template.list(topics);
            let html = template.HTML(title, list, 
                `
                <style>
                    table {
                        border-collapse: collapse;
                    }
                    td {
                        border: 1px solid #ccc;
                        padding: 5px;
                    }
                </style>
                ${template.authorTable(authors)}
                <form action="/author/create_process" method="post">
                    <input type="text" name="name" placeholder="input author name">
                    <br>
                    <textarea name="profile" placeholder="input author profile"></textarea>
                    <br>
                    <input type="submit" value="add author">
                </form>
                `, 
                ``
            );

            response.writeHead(200);
            response.end(html);

        });

        
    
    });

}

exports.create_process = function(request, response) {
    console.log('[author] create_process()');

    let body = ''
    request.on('data', function(data) {
        body += data;

    });

    request.on('end', function() {
        let post = qs.parse(body);
        
        db.query(
            `INSERT INTO AUTHOR(NAME, PROFILE) VALUES(?, ?)`, 
            [post.name, post.profile], 
            function(error, data) {
                response.writeHead(302, {Location: '/author'});
                response.end();

            });

    });

}

exports.update = function(request, response) {
    console.log('[author] update()');

    db.query(
        `SELECT * FROM TOPIC`, 
        function(error, topics) {

            db.query(
                `SELECT * FROM AUTHOR`, 
                function(error, authors) {

                    let _url = request.url;                         
                    let pathname = url.parse(_url, true).pathname;  
                    let queryData = url.parse(_url, true).query;  

                    db.query(
                        `SELECT * FROM AUTHOR WHERE ID=?`, 
                        [queryData.id],
                        function(error, author) {
                
                            // 홈
                            let title = 'author';
                            let list = template.list(topics);
                            let html = template.HTML(title, list, 
                                `
                                <style>
                                    table {
                                        border-collapse: collapse;
                                    }
                                    td {
                                        border: 1px solid #ccc;
                                        padding: 5px;
                                    }
                                </style>
                                ${template.authorTable(authors)}
                                <form action="/author/update_process" method="post">
                                    <input type="hidden" name="id" value="${author[0].ID}">
                                    <input type="text" name="name" value="${author[0].NAME}">
                                    <br>
                                    <textarea name="profile">${author[0].PROFILE}</textarea>
                                    <br>
                                    <input type="submit" value="update author">
                                </form>
                                `, 
                                ``
                            );
                
                            response.writeHead(200);
                            response.end(html);
                
                        });

                    });

        }

    );

}

exports.update_process = function(request, response) {
    console.log('[author] update_process()');

    let body = '';
    request.on('data', function(data) {
        body += data;

    });

    request.on('end', function(){
        let post = qs.parse(body);
        
        db.query(
            `
            UPDATE 
                AUTHOR 
            SET 
                NAME=?,
                PROFILE=? 
            WHERE 
                ID=?
            `, 
            [post.name, post.profile, post.id],
            function(error, data) {

                response.writeHead(302, {Location: '/author'});
                response.end();

            }
        );

    });

}

exports.delete_process = function(request, response) {
    console.log('[author] delete_process()');

    let body = '';

    request.on('data', function(data) {
        body += data;

    });

    request.on('end', function() {
        let post = qs.parse(body);

        db.query(
            `DELETE FROM TOPIC WHERE AUTHOR_ID = ?`,
            [post.id],
            function(error, data) {

                db.query(
                    `DELETE FROM AUTHOR WHERE ID = ?`,
                    [post.id],
                    function(error, data) {
                        response.writeHead(302, {Location: '/author'});
                        response.end();
        
                    }
                );

            }
        );
        
    });

}