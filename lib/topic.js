let template = require('./template.js');
let db = require('./db.js');
let url = require('url');
let qs = require('querystring');

exports.home = function(request, response) {
    console.log('[topic] home');

    db.query('SELECT * FROM TOPIC', function(error, topics){
        console.log('topics: ', topics);
    
        // 홈
        let title = 'Welcome';
        let _description = 'Hello, Node.js';
    
        let list = template.list(topics);
        let html = template.HTML(title, list, 
            `<h2>${title}</h2><p>${_description}</p>`, 
            `<a href="/create">create</a>`
        );
    
        response.writeHead(200);
        response.end(html);
    
    });

}

exports.page = function(request, response) {
    console.log('[topic] page');

    let _url = request.url;                         // url(ex. /?id=HTML)
    let pathname = url.parse(_url, true).pathname;  // url's command(ex. /)
    let queryData = url.parse(_url, true).query;    // url's query-string(ex. {id: HTML})

    // HTML, CSS, JavaScript

    // let sql = `
    //     SELECT 
    //         * 
    //     FROM 
    //         TOPIC T
    //     JOIN 
    //         AUTHOR A
    //     ON 
    //         T.AUTHOR_ID = A.ID 
    //     WHERE 
    //         T.ID = ?
    // `;
    let sql = `
        SELECT 
            T.ID AS T_ID,
            T.TITLE AS T_TITLE,
            T.DESCRIPTION AS T_DESCRIPTION,
            T.CREATED AS T_CREATED,
            T.AUTHOR_ID AS T_AUTHOR_ID,
            A.ID AS A_ID,
            A.NAME AS A_NAME,
            A.PROFILE AS A_PROFILE
        FROM TOPIC T
        JOIN  AUTHOR A
        ON T.AUTHOR_ID = A.ID 
        WHERE T.ID = ?;
    `;
    let states = [queryData.id];

    db.query(
        sql, 
        states, 
        function(error, topic){

            sql = 
            `
            SELECT * FROM TOPIC
            `;

            db.query(sql, function(error, topics) {
                
                let title = topic[0].T_TITLE;
                let description = topic[0].T_DESCRIPTION;

                let html = template.HTML(
                    title, 
                    template.list(topics), 
                    `
                    <h2>${title}</h2><p>${description}</p>
                    <p>by ${topic[0].A_NAME}</p>
                    `, 
                    `
                    <a href="/create">create</a>
                    &nbsp;&nbsp;
                    <a href="/update?id=${topic[0].T_ID}">update</a>
                    &nbsp;&nbsp;
                    <form action='/delete_process' method='post' name='delete_form' onsubmit='return confirm("정말로 삭제 할꺼니?")'>
                        <input type='hidden' name='id' value='${topic[0].T_ID}'>
                        <input type='submit' value='delete'>
                    </form>
                    `);
    
                    response.writeHead(200);
                    response.end(html);

                });

    });

}

exports.create = function(request, response) {
    console.log('[topic] create');

    db.query('SELECT * FROM TOPIC', function(error, topics) {

        db.query('SELECT * FROM AUTHOR', function(error, author) {

            let tag = '';
            let i = 0;
            while(i < author.length) {
                tag += `<option value='${author[i].ID}'>${author[i].NAME}</option>`;
                i++;
            }

            let html = template.HTML(
                'create', 
                template.list(topics), 
                    `
                        <form action='/create_process' name='create_form' method='post'>
                            <p><input type='text' name='title' placeholder='title'></p>
                            <p>
                                <textarea name='description' placeholder='description'></textarea>
                            </p>
                            <p>
                                <select name="author">
                                    ${tag}
                                </select>
                            </p>
                            <p>
                                <input type='submit'>
                            </p>
                        </form>
                    `, 
                    ``);

            response.writeHead(200);
            response.end(html);

        });

    });

}

exports.create_process = function(request, response) {
    console.log('[topic] create_process()');

    let body = '';

    request.on('data', function(data) {
        body += data;

    });

    request.on('end', function() {

        let post = qs.parse(body);

        db.query(
            `INSERT INTO TOPIC(TITLE, DESCRIPTION, AUTHOR_ID) VALUES(?, ?, ${post.author})`, 
            [post.title, post.description], 
            function(error, result){

                response.writeHead(302, {Location: `/?id=${result.insertId}`});
                response.end();

            });

    });

}

exports.update = function(request, response) {
    console.log('[topic] update()');

    let _url = request.url;                         // url(ex. /?id=HTML)
    let pathname = url.parse(_url, true).pathname;  // url's command(ex. /)
    let queryData = url.parse(_url, true).query;    // url's query-string(ex. {id: HTML})

    db.query('SELECT * FROM TOPIC', function(error1, topics){    

        db.query('SELECT * FROM TOPIC WHERE ID = ?', [queryData.id], function(error2, topic) {

            db.query('SELECT * FROM AUTHOR', function(error3, author) {

                let title = topic[0].TITLE;
                let description = topic[0].DESCRIPTION;

                let tag = '';
                let i = 0;
                while(i < author.length) {
                    let selected = '';
                    if (author[i].ID === topic[0].AUTHOR_ID) {
                        selected = 'selected';
                    }
                    tag += `<option value='${author[i].ID}' ${selected}>${author[i].NAME}</option>`;
                    i++;
                }

                let html = template.HTML(
                    title, 
                    template.list(topics), 
                    `
                    <form action='/update_process' name='update_form' method='post'>

                        <input type='hidden' name="id" value='${topic[0].ID}'>
                        <p><input type='text' name='title' value='${title}'></p>
                        <p>
                            <textarea name='description'>${description}</textarea>
                        </p>
                        <p>
                            <select name="author">
                                ${tag}
                            </select>
                        </p>
                        <p>
                            <input type='submit'>
                        </p>
                    </form>
                    `,
                    `
                    <a href="/create">create</a>
                    `
                );

                response.writeHead(200);
                response.end(html);

            });
            
        });

    });

}

exports.update_process = function(request, response) {
    console.log('[topic] update_process()');

    let body = '';

    request.on('data', function(data){
        body += data;

    });

    request.on('end', function(){
        let post = qs.parse(body);
        
        let id = post.id;
        let title = post.title;
        let description = post.description;
        let author = post.author;

        db.query(
            'UPDATE TOPIC SET TITLE=?, DESCRIPTION=?, AUTHOR_ID=? WHERE ID=?', 
            [title, description, author, id], 
            function(error, result){

                response.writeHead(302, {Location: `/?id=${id}`});
                response.end();

            });

    });

}

exports.delete_process = function(request, response) {
    console.log('[topic] delete_process()');

    let body = '';

    request.on('data', function(data) {
        body += data;

    });

    request.on('end', function() {
        let post = qs.parse(body);
        let id = post.id;

        db.query('DELETE FROM TOPIC WHERE ID = ?', [id], function(error, result){

            response.writeHead(302, {Location: '/'});
            response.end();

        });                     

    });

}