require('dotenv').config()
var mysql = require("mysql");
var connection = mysql.createConnection(process.env.dataBaseUrl)
function Main(){
    connection.connect(function (error) {
        if (error) {
          throw error;
        } else {
          console.log("[SQL] Database done!");
        }
    });
}

module.exports = {
    Main,
    getQuerie: async function(query, args) {
        try {
            var result = new Promise((resolve, reject) => {
                connection.query(query, args, function(err, data,fields){
                    if(err)reject(err)
                    resolve(data)
                })
            })
            return result
        } catch (error) {
            throw error
        }
        return result
    },
    runQuerie: async function(query, args){
        try {
            connection.query(query,args)
        } catch (error) {
            throw error
        }
    }
}
