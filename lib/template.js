module.exports = {
    HTML: function (title, list, body, control) {
            console.log('templateHTML()');
        
            return `
                    <!doctype html>
                    <html>
                    <head>
                    <title>WEB4 - ${title}</title>
                    <meta charset="utf-8">
                    </head>
                    <body>
                    <h1><a href="/">WEB</a></h1>
                    <a href="/author">author</a>
                    ${list}
                    ${control}
                    ${body}
                    </body>
                    </html>`;
        
        },
    list: function (filelist) {
        console.log('templateList()');
    
        let list = '<ul>';
            let i = 0;
            while(i < filelist.length) {
                list += `<li><a href="/?id=${filelist[i].ID}">${filelist[i].TITLE}</a></li>`;
                i++;
            }
            list += '</ul>';
    
        return list;
    
    },
    authorTable: function (authors) {

        let tag = '<table>';
        let i = 0;
        while (i < authors.length) {

            tag += '<tr>';
            tag += `<td>${authors[i].NAME}</td>`;
            tag += `<td>${authors[i].PROFILE}</td>`;
            tag += `<td><a href="/author/update?id=${authors[i].ID}">update</a></td>`;
            tag += 
            `<td>
                <form action='/author/delete_process' method='post'>
                    <input type='hidden' name='id' value='${authors[i].ID}'>
                    <input type='submit' value='delete'>
                </form>
            </td>`;
            tag += '</tr>';

            i++;

        }
        tag += '</table>';

        return tag;

    },

}

// module.exports = template;