var sql = require('./../db')

var functions = {
    addToDb :  async function(title,subtitle,body,image){
        return new Promise(async function(resolve, reject) {
            dateNow = new Date();
            var statement = `insert into posts (title,subtitle,body,image, submitDate) values(?,?,?,?,?)`;

            var row = await sql.run(statement,[title,subtitle,body,image,dateNow], function(err) {
                if (err) {
                    console.log(err);
                }
                else{
                    resolve(this.lastID);
                }
            });
        });
    },

    getPost : async function(id){
        return new Promise(async function(resolve, reject) {
            var statement = `select * from posts where id = ${id}`;

            await sql.get(statement,[], function(err,row) {
                if (err) {
                    console.log(err);
                }
                else{
                    resolve(row);
                }
            });
        });
    },

    getPosts : async function(){
        return new Promise(async function(resolve, reject) {
            var statement = `select * from posts order by submitDate desc limit 5`;

            await sql.all(statement,[], function(err,rows) {
                if (err) {
                    console.log(err);
                }
                else{
                    resolve(rows);
                }
            });
        });
    },
    getAllPosts : async function(){
        return new Promise(async function(resolve, reject) {
            var statement = `select * from posts order by submitDate`;

            await sql.all(statement,[], function(err,rows) {
                if (err) {
                    console.log(err);
                }
                else{
                    resolve(rows);
                }
            });
        });
    }
    
}

module.exports = functions;